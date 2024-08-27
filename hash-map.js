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
    //calls hash method to get the index where they key-value is stored
        let index = this.hash(key);
    //check if calculated index is within bounds
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    //if no buckets in array it creates an empty array
        if(!this.buckets[index]) this.buckets[index] = [];
    //If the 
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
//returns true if key is found in bucket, else false
    has(key){
//class the get method and checks if it returns a non null value
        return this.get(key) !== null;
    }

    remove(key){
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let bucket = this.buckets[index];
        for(let i = 0; i < bucket.length; i++){
            let [storedKey] = bucket[i];
            if(storedKey === key){
                bucket.splice(i, 1);
                this.size--
                return true;
            }
        }
        return false

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

console.log(test.get('kite')); // "pink"
console.log(test.has('lion')); // true
test.remove('lion');
console.log(test.has('lion')); // false