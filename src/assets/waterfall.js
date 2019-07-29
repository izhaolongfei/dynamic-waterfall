/**
 * @file waterfall.js
 * @author: zhaolongfei
 */

export default class Waterfall {

    /**
     * constructor
     * @param {number} cwidth 容器宽度
     * @param {number} margin 左右边距
     * @param {number} gap 元素艰巨
     * @param {number} column 列数
     * @param {Array} list 数据列表
     */
    constructor(cwidth, margin = 5, gap = 5, column = 2, list = []) {
        if (!cwidth) {
            throw new Error('Container width is required!');
        }
        this.width = cwidth; // 瀑布流宽度
        this.height = 0; // 瀑布流总高度
        this.w = (this.width - margin * 2 - gap * (column - 1)) / column; // 元素宽度
        this.margin = margin;
        this.gap = gap;
        this.column = column;

        if (!list || !(list instanceof Array)) {
            throw new Error('Involid list!');
        } else {
            this.list = list;
        }

        this.init();
    }

    init() {
        this.queue = [];
        this.link = [];

        for (let i = 0; i < this.column; i++) {
            this.queue[i] = {
                height: 0, // 列的总高度
                stack: []
            };
        }

        this.serialize(0, this.list);
    }

    findMinQueue() {
        let min = 0;

        for (let col in this.queue) {
            if (this.queue[col].height < this.queue[min].height) {
                min = col;
            }
        }

        return min;
    }

    findMaxQueue() {
        let max = 0;

        for (let col in this.queue) {
            if (this.queue[col].height > this.queue[max].height) {
                max = col;
            }
        }

        return max;
    }

    insertQueue(col, itemHeight, index) {
        this.queue[col].height += (itemHeight + this.gap);
        // 入栈当前数据的下表，和当前队列高度
        this.queue[col].stack.push({
            height: this.queue[col].height,
            index: index
        });
    }

    serialize(start, list) {
        for (let i = 0; i < list.length; i++) {
            const itemHeight = this.w * list[i].height / list[i].width;
            const minCol = +this.findMinQueue(); // 第几列

            this.link.splice(start + i, 0, {
                top: this.queue[minCol].height + this.gap,
                left: this.margin + (this.w + this.gap) * minCol,
                width: this.w,
                height: itemHeight
            });

            this.insertQueue(minCol, itemHeight, start + i);
        }
    }

    insert(offset, list) {
        const tail = this.link.splice(offset);

        // 出栈offset之后的队列信息
        for (let i = 0; i < this.column; i++) {
            const stack = this.queue[i].stack;
            let j = stack.length - 1;

            while (j >= 0 && stack[j].index >= offset) {
                stack.pop();
                j--;
            }

            this.queue[i].height = j < 0 ? 0 : stack[j].height;
        }

        this.serialize(offset, list);
        this.serialize(offset + list.length, tail);
    }

    append(list) {
        this.insert(this.link.length, list);
    }

    reset() {
        this.list = [];
        this.init();
    }

    getWfallList() {
        return this.link;
    }

    getWfallHeight() {
        return this.queue[this.findMaxQueue()].height;
    }

    which2show(scrollTop) {
        let min = {
            index: 0,
            height: Infinity
        };
        for (let colobj of this.queue) {
            for (let item of colobj.stack) {
                if (item.height >= scrollTop && item.height < min.height) {
                    min = item;
                }
            }
        }
        return min.index;
    }

    scroll2top(index) {
        for (let colobj of this.queue) {
            for (let item of colobj.stack) {
                if (item.index === index) {
                    return item.height;
                }
            }
        }
    }
}
