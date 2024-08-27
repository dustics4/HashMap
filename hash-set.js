class HashSet {
    constructor(){
        this.buckets = new Array(4); // Initializing with a fixed size
        this.size = 0;
        this.threshHold = 0.75;
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

    resize(){
        let oldBucket = this.buckets;
        this.buckets = new Array(oldBucket.length * 2);
        this.size = 0;

        oldBucket.forEach((bucket) =>{
            if(bucket){
                bucket.forEach((key) => {
                    this.set(key);
                })
            }
        })
    }

    set(key){
        if(this.size / this.buckets.length > this.threshHold){
            this.resize()
        }
        
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
            if(bucket[i] === key){
                return;
            }
        }
        bucket.push([key]);
        this.size++;
    }

    has(key){
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let bucket  = this.buckets[index];

        if(bucket){
            for(let storedKey of bucket){
                if(storedKey === key) return true;
            }
        }
        return false
    }
//takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. 
//If the key isn’t in the hash map, it should return false
    remove(key){
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let bucket = this.buckets[index];
        for(let i = 0; i < bucket.length; i++){
            if(bucket[i] === key){
                bucket.splice(i, 1);
                this.size--
                return true;
            }
        }
        return false

    }
//returns the number of stored keys in the hashmap
    length(){
        return this.size;
    }

    clear(){
       //reset all buckets and initialize size
       this.buckets = new Array(4);
       this.size = 0;
    }
 //Method to display all the keys   
    keys(){
        let keysArray = [];

        this.buckets.forEach(bucket => {
            if(bucket){
                bucket.forEach(([key]) =>{
                    keysArray.push([key]);
                })
            }
            //if there is a bucket element
            //bucket.forEach - key element . push into the key into the keys array.
        })

        return keysArray;
    }

}

const set = new HashSet();
set.set('apple');
set.set('banana');
console.assert(set.has('apple') === true, 'Apple should be in the set');
console.assert(set.has('orange') === false, 'Orange should not be in the set');
set.remove('apple');
console.assert(set.has('apple') === false, 'Apple should be removed from the set');
set.clear();
console.assert(set.length() === 0, 'Set should be empty after clear');