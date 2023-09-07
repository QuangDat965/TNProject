using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TnServer.DataBase;
using TnServer.DataBase.Entity;
using TnServer.Models;

namespace TnServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TnController : ControllerBase
    {
        private readonly TnDbContext dbContext;

        public TnController(TnDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet, Route("getsubject")]
        public  IActionResult GetTopic()
        {
            var kq = from data in dbContext.Subjects
                     select new
                     {
                         id = data.Id,
                         name = data.Name,
                         description = data.Description,
                     };
            return new OkObjectResult(kq);
        }

        [HttpPost, Route("getquestion")]
        public IActionResult Getquestion([FromBody] RequestModelcs request)
        {
            var kq = (from data in dbContext.Questions
                     join a in dbContext.Answers on data.Id equals a.QuestionId
                     where data.SubjectId == request.TopicId
                     select new
                     {
                        id = data.Id,
                        question= data.Name,
                        answers= new string[4] {a.Name,"","",""},
                        correctAnswer= a.Name,
                        userSelect= "",
                     }).ToList();

            
            var answerall = dbContext.Answers.Select(p=>p.Name).ToList();
           
         

            //do 3 du lieu randome vao
            for(int i =0; i< kq.Count(); i++)
            {
                Random random = new Random();
                List<string> selectedItems = new List<string>();
                selectedItems.Add(kq[i].answers[0]);
                while (selectedItems.Count < 4)
                {
                    int randomIndex = random.Next(answerall.Count);
                    string selectedItem = answerall[randomIndex];

                    if (!selectedItems.Contains(selectedItem))
                    {
                        selectedItems.Add(selectedItem);
                    }
                }
                for(int j = 1; j < 4; j++)
                {
                    kq[i].answers[j] = selectedItems[j];
                }
             
            }

            //hoan doi 4 cau tra loi
            for (int i = 0; i < kq.Count(); i++)
            {
                for (int j = 0; j < 4*2; j++)
                {
                    var rnd1 = new Random().Next(3);
                    var rnd2 = new Random().Next(3);

                    Swap(ref kq[i].answers[rnd1], ref kq[i].answers[rnd2]);
                }
            }

            Shuffle(kq);

            return new OkObjectResult(kq);
        }
        [HttpPost,Route("subjectadd")]
        public IActionResult AddSubject([FromBody] RequestAddSubject requestAdd)
        {
            try
            {
                dbContext.Add(new Subject()
                {
                    Name = requestAdd.Name!,
                    Description = requestAdd.DesCription!
                });
                
                return Ok(dbContext.SaveChanges()>0);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost, Route("addqa")]
        public IActionResult AddQA([FromBody] RequestQAAdd requestAdd)
        {
            try
            {
                var questionAdd = new Question()
                {
                    Name = requestAdd.QuestionName,
                    SubjectId = requestAdd.SubjectId,
                };
                dbContext.Add(questionAdd);
                dbContext.SaveChanges();

                var rs = dbContext.Questions.Find(questionAdd.Id);
                if (rs != null)
                {
                    var answeradd = new Answer()
                    {
                        Name = requestAdd.Answer,
                        QuestionId = rs.Id
                    };
                    dbContext.Add(answeradd);
                    dbContext.SaveChanges();
                }

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost, Route("removequestion")]
        public IActionResult RemoveQuestion([FromBody] CommonRequest request)
        {
            try
            {
                var question = dbContext.Questions.Find(request.Id);
                if (question == null)
                {
                    return NotFound();
                }
                dbContext.Questions.Remove(question);
                dbContext.SaveChanges();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost, Route("editsub")]
        public IActionResult EdutSub([FromBody] CommonRequest request)
        {
            try
            {
                var rs = dbContext.Subjects.Find(request.Id);
                if (rs == null)
                {
                    return BadRequest("not found");
                }
                rs.Name = request.NameSub!;
                rs.Description = request.SubSub!;
                dbContext.SaveChanges();
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost, Route("removesub")]
        public IActionResult RemoveSub([FromBody] CommonRequest request)
        {
            try
            {
                var rs = dbContext.Subjects.Find(request.Id);
                if (rs == null)
                {
                    return BadRequest("not found");
                }
                dbContext.Subjects.Remove(rs);
                dbContext.SaveChanges();
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        public static void Swap<T>(ref T a, ref T b)
        {
            T temp = a;
            a = b;
            b = temp;
        }

        public static void Shuffle<T>(List<T> list)
        {
            Random rng = new Random();
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }
    }
}
