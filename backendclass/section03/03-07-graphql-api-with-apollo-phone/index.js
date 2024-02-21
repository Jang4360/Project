import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone';
import {checkPhone, getToken, sendTokenToSMS } from './phone.js'

const resolvers={
    Mutation:{
        createTokenOfPhone:(_,args)=>{ //_는 안쓰겠다는 의미
            const isValid = checkPhone(args.myPhone);
            if (isValid){
                const token = getToken();
                sendTokenToSMS(args.myPhone,token);
                return '인증 완료'
            };  
    }
}}

const typeDefs=`#graphql
    type Mutation{
        createTokenOfPhone{myPhone:String}: String
    }
`

const server=new ApolloServer({
    typeDefs, //shorthand property 
    resolvers,
    cors: true, //모든 사이트 허용하고 싶을 때 
    //cors: {origin:["http://nevr.com","http://daum.net"]} //특정 사이트만 허용하고 싶을 때
})
startStandaloneServer(server)

