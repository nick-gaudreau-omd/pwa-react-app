export default class Util {

    /**
     * Returns an array with arrays of the given size.
     * Best in performance
     * https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
     *
     * @param myArray {Array} Array to split
     * @param chunkSize {Integer} Size of every group
     */
    public static chunkArray(myArray: any, chunk_size: any): any {
        var results = [];

        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }

        return results;
    }

}