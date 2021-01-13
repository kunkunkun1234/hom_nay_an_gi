class Dishes {
    constructor() {
        this.dishes = [];
        this.currentDish = {};
    }

    get(id) {
        if (!id)
            return this.dishes || [];

        if ($.isEmptyObject(this.dishes))
            return {};

        return this.dishes.find(item => item.id === id) || {};
    }

    getCurrentDish() {
        return this.currentDish;
    }

    getRandom() {
        if ($.isEmptyObject(this.dishes))
            return {};

        let countToStop = 0;
        while (countToStop < 500) {
            let id = rando(1, this.dishes.length);
            if (id === this.currentDish.id) continue;

            let element = this.dishes.find(item => item.id === id) || {};
            if (!$.isEmptyObject(element)) {
                this.currentDish = element;
                return element;
            }

            countToStop++;
        }
    }

    push(item) {
        if (item instanceof Dish) {
            this.dishes.push(item);
        }
    }

    toJson() {
        return JSON.parse(JSON.stringify(this));
    }
};

class Dish {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = "";
    }

    get() {
        console.log(this);
    }
};