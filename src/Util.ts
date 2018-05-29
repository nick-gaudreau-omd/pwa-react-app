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

    public static urlBase64ToUint8Array(base64String:string) {
        const padding = '='.repeat((4 -base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData= window.atob(base64);
        const outputArray= new Uint8Array(rawData.length);
        for(let i= 0; i< rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

}