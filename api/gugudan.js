export default function (request, response) {
    const { x } = request.query;
    const number = parseInt(x);

    // 숫자가 아니거나 유효하지 않은 범위일 경우
    if (isNaN(number) || number < 1 || number > 9) {
        response.status(400).json({ error: '1 ~ 9 사이의 유효한 숫자를 입력해야 합니다.' });
        return;
    }

    const result = [];
    for (let i = 1; i <= 9; i++) {
        result.push(`${number} x ${i} = ${number * i}`);
    }

    // JSON 형태로 결과 응답
    response.status(200).json({ result });
}