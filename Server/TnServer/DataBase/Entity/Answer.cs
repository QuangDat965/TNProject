using System.ComponentModel.DataAnnotations;
using System.Security.Principal;

namespace TnServer.DataBase.Entity
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}