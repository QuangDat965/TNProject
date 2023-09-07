using System.ComponentModel.DataAnnotations;

namespace TnServer.DataBase.Entity
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Question> Questions { get; set; }
    }
}
