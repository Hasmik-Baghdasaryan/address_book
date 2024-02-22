function AddressBook() {
    var self = this;

    self.fullName = ko.observable().extend({
        required: true,
        checkFullName: self.fullName
    });
    self.fullName('');

    self.phoneNumber = ko.observable().extend({
        required: true,
        checkPhoneNumber: self.phoneNumber,
        pattern: {
            params: /^(\d{2}) (\d{2}) (\d{6})$/g,
            message: 'Invalid Format'
        }
    });
    self.phoneNumber('');

    self.contactInfo = ko.observableArray([]);

    self.addContact = function () {
        if (self.fullName() && self.phoneNumber()) {
            self.contactInfo.push({
                contactName: self.fullName(),
                contactPhone: self.phoneNumber(),
            });
        }
        self.fullName('');
        self.phoneNumber('');
    };
    self.showTable = function () {
        return self.contactInfo().length ? true : false;
    };

    self.formatPhoneNumber = function () {
        var value = self.phoneNumber().replace(/ /g, '');

        if (value.length <= 2) {
            self.phoneNumber(value.replace(/(\d{2})/, '$1'));
        } else if (value.length >= 3 && value.length < 5) {
            self.phoneNumber(value.replace(/(\d{2})(\d+)/, '$1 $2'));
        } else if (value.length >= 5) {
            self.phoneNumber(value.replace(/(\d{2})(\d{2})(\d+)/, '$1 $2 $3'));
        }
        return true
    };

    self.errors = ko.validation.group(self, { deep: true, live: true, observable: true });

    self.buttonDisabled = function () {
        return self.errors().length ? true : false;
    };
}
var addressBook = new AddressBook();
var bindElement = document.querySelector('[data-bind-id="addressBook"]');

if (bindElement) {
    ko.applyBindings(addressBook, bindElement);
}