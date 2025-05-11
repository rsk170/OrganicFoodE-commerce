using System.Collections.Generic;

namespace API.Errors
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public IEnumerable<string> Errors { get; set; }
        
        //the message is coming from the [apicontroller] attribute 
        public ApiValidationErrorResponse() : base(400)
        {

        }
    }
}