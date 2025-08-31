export default function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { number } = req.query;
  
    // 입력값 검증
    if (!number) {
      return res.status(400).json({ error: '숫자를 입력해주세요.' });
    }
  
    const num = parseInt(number);
    
    if (isNaN(num) || num < 1) {
      return res.status(400).json({ error: '1 이상의 정수를 입력해주세요.' });
    }
  
    // 너무 큰 수는 제한 (성능상의 이유)
    if (num > 1000000) {
      return res.status(400).json({ error: '100만 이하의 숫자를 입력해주세요.' });
    }
  
    try {
      // 약수 계산
      const divisors = findDivisors(num);
      
      return res.status(200).json({
        number: num,
        divisors: divisors,
        count: divisors.length
      });
      
    } catch (error) {
      console.error('약수 계산 중 오류:', error);
      return res.status(500).json({ error: '계산 중 오류가 발생했습니다.' });
    }
  }
  
  // 약수를 찾는 함수
  function findDivisors(n) {
    const divisors = [];
    
    // 1부터 √n까지만 검사하여 효율성 향상
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        divisors.push(i);
        
        // i와 n/i가 다르면 n/i도 약수에 추가
        if (i !== n / i) {
          divisors.push(n / i);
        }
      }
    }
    
    // 오름차순으로 정렬
    return divisors.sort((a, b) => a - b);
  }