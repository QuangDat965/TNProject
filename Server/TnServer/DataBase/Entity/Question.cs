using System.ComponentModel.DataAnnotations;

namespace TnServer.DataBase.Entity
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Answer> Answers  { get; set; }

        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
