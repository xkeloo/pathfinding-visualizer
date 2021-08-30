export class UtilityFunctions {
    public static resolveWait(ms: number) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, ms);
        });
      }
}