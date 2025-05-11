using System.Runtime.Serialization;

namespace Basis.Entities.OrderClasses
{
    public enum OrderStatus
    {
        // attrubute to returen text instead of 0, 1, 2
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Received")]
        PaymentReceived,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed
    }
}
