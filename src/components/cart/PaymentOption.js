export const PaymentOption = ({ value, label, selectedPayment, onChange }) => {
    return (
        <label className="flex items-center gap-1 mt-2 cursor-pointer">
            <input
                type="radio"
                name="payment"
                className="hidden"
                checked={selectedPayment === value}
                onChange={() => onChange(value)}
            />
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex justify-center items-center bg-white">
                {selectedPayment === value && <div className="w-2 h-2 bg-gray-800 rounded-full"></div>}
            </div>
            <p>{label}</p>
        </label>
    );
};
