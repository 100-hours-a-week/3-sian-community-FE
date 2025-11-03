// 함수형 프로그래밍 - 미니퀘스트 2
const sumArray = (array) => {
    let total = 0;
    for(const element of array) {
        total += element;
    }
    return total;
}
console.log(sumArray([1,2,3,4,5]));