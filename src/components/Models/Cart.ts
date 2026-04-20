import { IProduct } from '../../types';

export class Cart {
    private items: IProduct[] = [];

    getItems(): IProduct[] {
        return this.items;
    }

    add(product: IProduct) {
        if (!this.has(product.id)) {
            this.items.push(product);
        }
    }

    remove(id: string) {
        this.items = this.items.filter(item => item.id !== id);
    }

    clear() {
        this.items = [];
    }

    getTotal(): number {
        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    getCount(): number {
        return this.items.length;
    }

    has(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}