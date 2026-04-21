import { IBuyer } from '../../types';

type ValidationErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
    private data: IBuyer = {
        payment: 'card',
        email: '',
        phone: '',
        address: ''
    };

    setData(data: Partial<IBuyer>) {
        this.data = {
            ...this.data,
            ...data
        };
    }

    getData(): IBuyer {
        return this.data;
    }

    clear() {
        this.data = {
            payment: 'card',
            email: '',
            phone: '',
            address: ''
        };
    }

    validate(): ValidationErrors {
        const errors: ValidationErrors = {};

        if (!this.data.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.data.address) {
            errors.address = 'Введите адрес';
        }

        if (!this.data.email) {
            errors.email = 'Введите email';
        }

        if (!this.data.phone) {
            errors.phone = 'Введите телефон';
        }

        return errors;
    }
}