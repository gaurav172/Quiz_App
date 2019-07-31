package main

import (
   "fmt"
   "strconv"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
   _ "github.com/mattn/go-sqlite3"
  )

var db *gorm.DB                                         // declaring the db globally
var err error

type Quiz struct {
  ID int `json:"id"`
  Name string `json:"name"`
  Genre string `json:"genre"`
}

type Person struct {
   ID int `json:"id"`
   FirstName string `json:"firstname"`
   LastName string `json:"lastname"`
   Username string `json:"username"`
   Password string `json:"password"`
}

type Question struct {
   ID int `json:"id"`
   Que string `json:"que"`
   O1 string `json:"op1"`
   O2 string `json:"op2"`
   O3 string `json:"op3"`
   C1 bool `json:"c1"`
   C2 bool `json:"c2"`
   C3 bool `json:"c3"`
   No int `sql:"type:bigint REFERENCES quizzes(id) ON DELETE CASCADE ON UPDATE CASCADE"; json:"no"`
}

type Leaderboard struct {
  Username string `json:"username"`
  Total int `json:"total"`
}

type Sboard struct {
  Name string `json:"name"`
  Genre string `json:"genre"`
  Score int `json:"score"`
}

type Attempt struct {
  Username string `json:"username"`
  Qid int `json:"qid"`
  Score int `json:"score"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.LogMode(true)
   db.AutoMigrate(&Person{})
   db.AutoMigrate(&Attempt{})
   db.AutoMigrate(&Question{})
   db.AutoMigrate(&Quiz{})
   db.Exec("PRAGMA foreign_keys=ON")
   r := gin.Default()
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/people/:id", GetPerson)
   r.DELETE("/quiz/:id",DeleteQuiz)
   r.GET("/quizname/:id",QuizName)
   r.POST("/people", CreatePerson)
   r.POST("/question", NewQue)
   r.POST("/addscore",addScore)
   r.PUT("/updateque", UpdateQue)
   r.PUT("/people/:id", UpdatePerson)
   r.GET("/playquiz/:id",PlayQuiz)
   r.DELETE("/people/:id", DeletePerson)
   r.POST("/login",LogIn)
   r.GET("/question/:id", GetQue)
   r.GET("/scoreboard/:username",ScoreUser)
   r.DELETE("/que/:id",DeleteQuestion)
   r.GET("/got", Got)
   r.GET("/ViewQuiz",ViewQuiz)
   r.GET("/AddQuestion",ViewQuiz)
   r.GET("/DeleteQuiz",ViewQuiz)
   r.POST("/AddQuiz", AddQuiz)
   r.GET("/sports", Sports)
   r.GET("/leaderboard", Lead)
   r.GET("/Glb", Glb)
   r.GET("/Slb",Slb)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}

func AddQuiz(c *gin.Context) {
  var quiz Quiz
  c.BindJSON(&quiz)
  db.Create(&quiz)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, quiz)
}

func Glb(c *gin.Context) {
  var L []Leaderboard
  db.Table("attempts").Select("attempts.username,attempts.score").Joins("inner join quizzes on quizzes.id=attempts.qid and quizzes.genre=?","Game of Thrones").Select("username as username,sum(score) as total").Group("username").Order("total desc").Find(&L);
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented  
  c.JSON(200,L);
}

func Slb(c *gin.Context) {
  var L []Leaderboard
  db.Table("attempts").Select("attempts.username,attempts.score").Joins("inner join quizzes on quizzes.id=attempts.qid and quizzes.genre=?","Sports").Select("username as username,sum(score) as total").Group("username").Order("total desc").Find(&L);
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented  
  c.JSON(200,L);
}

func Lead(c *gin.Context) {
  var L []Leaderboard
  db.Table("attempts").Select("username as username, sum(score) as total").Group("username").Order("total desc").Find(&L)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200,L);
}

func ScoreUser(c *gin.Context) {
  var username=c.Params.ByName("username");
  var S []Sboard
  db.Table("attempts").Select("quizzes.name,quizzes.genre,attempts.score").Joins("inner join quizzes on quizzes.id=attempts.qid and attempts.username=?",username).Find(&S);
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200,S);
}

func addScore(c *gin.Context) {
  var att Attempt
  c.BindJSON(&att);
  db.Create(&att);
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200,att);
}

func UpdateQue(c *gin.Context) {
  var que Question
  id := c.Params.ByName("id")
  if err := db.Where("id = ?", id).First(&que).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  }
  c.BindJSON(&que)
 //  fmt.Println(person.no)
  db.Save(&que)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200,que)
}

func QuizName(c *gin.Context) {
  var quiz Quiz
  id, _ := strconv.Atoi(c.Params.ByName("id"))
  err := db.Find(&quiz, id).Error
  if err != nil {
    c.AbortWithStatus(404)
    fmt.Println(err)
 }
//  fmt.Println(quiz.Name)
 c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
 c.JSON(200,map[string]string{"name" : quiz.Name})
}

func PlayQuiz(c *gin.Context) {
    id := c.Params.ByName("id")
    var que []Question
  if err := db.Where("no=?",id).Find(&que).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, que)
  }
}


func ViewQuiz(c *gin.Context) {
  var quiz []Quiz
   if err := db.Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quiz)
   }
}

func LogIn(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   if err :=db.Find(&person, "Username = ? AND Password = ?", person.Username, person.Password ).Error; err != nil {
      c.JSON(201,person)
     fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
     c.JSON(200, person)
     fmt.Println("Success")
   }
}

func Sports(c *gin.Context) {
  var quiz []Quiz
  if err := db.Where("genre=?","Sports").Find(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, quiz)
  }
}

func Got(c *gin.Context) {
  var quiz []Quiz
  if err := db.Where("genre=?","Game of Thrones").Find(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, quiz)
  }
}

func GetQue(c *gin.Context) {
  id := c.Params.ByName("id") 
  var que Question
   if err := db.Where("id = ?",id).First(&que).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, que)
   }
}

func NewQue(c *gin.Context) {
   var que Question
   c.BindJSON(&que)
   db.Create(&que)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, que)
}

func DeleteQuiz(c *gin.Context) {
  id := c.Params.ByName("id")
  var quiz Quiz
  d := db.Where("id = ?", id).Delete(&quiz)
  fmt.Println(d)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
  id := c.Params.ByName("id")
  var que Question
  d := db.Where("id = ?", id).Delete(&que)
  fmt.Println(d)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
  //  fmt.Println(person.no)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, person)
   }
}

func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}
