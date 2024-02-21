export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API 설명서',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.swagger.js'], // swagger 파일안에 .swagger로 끝나는 모든 파일 
  };