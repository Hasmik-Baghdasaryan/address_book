ko.validation.init({
    errorMessageClass: "koError",
    errorElementClass: "koErrorField",
    decorateInputElement: true,
});

ko.validation.rules["checkFullName"] = {
    validator: function (val, otherVal) {
        var checkValue = new RegExp("^[^$;\/%*]+$");
        if (checkValue.test(val)) {
            return true;
        }
    },
    message: "$, %, ;, * symbols aren't allowed."
};

ko.validation.rules["checkPhoneNumber"] = {
    validator: function (val, otherVal) {
        var checkAllowance = new RegExp("^[0-9]+|[\b]+$");
        return checkAllowance.test(val);
    },
    message: "Only numbers allowed."
};
ko.validation.registerExtenders();