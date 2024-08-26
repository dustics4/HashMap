class HashMap {
    constructor(){
        this.buckets = new Array(4); // Initializing with a fixed size
        this.size = 0;
    }
//takes in a key and produces a hashcode with it
    hash(key){
        let hashCode = 0;

        let primeNumber = 31;
        for(const char in key){
            hashCode = (primeNumber * hashCode * key.charCodeAt(char) % this.buckets.length);
        }
        return hashCode;
    }

    set(key, value){
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }

        if(!this.buckets[index]) this.buckets[index] = [];

        let bucket = this.buckets[index];
        for(let i = 0; i < bucket.length; i++){
            const [storedKey] = bucket[i];
            if(storedKey === key){
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key,value]);
        this.size++;
    }

    get(key){
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let bucket  = this.buckets[index];

        if(bucket){
            for(let [storedKey, value] of bucket){
                if(storedKey === key) return value;
            }
        }
        return null;
    }
}

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.get('kite'));