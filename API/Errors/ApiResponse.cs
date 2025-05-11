using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch 
            {
                400 => "A bad request",
                401 => "Not authorized",
                403 => "Forbidden",
                404 => "Resource not found",
                500 => "Server error",
                _ => null //in case not match
            };
        }
    }
}