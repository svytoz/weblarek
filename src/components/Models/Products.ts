import { IProduct } from '../../types';

export class Products {
    private items: IProduct[] = [];
    private selected: IProduct | null = null;

    setItems(items: IProduct[]) {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    setSelected(product: IProduct | null) {
        this.selected = product;
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}