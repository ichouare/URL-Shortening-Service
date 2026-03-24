// generate kes functon base:random1:random2
// get keys function
// delete keys funtion
// store key and value

import { initlializeRedisClient } from "./redisClient.js"


export  function genetateKeys(...args: string[]){
    return  `base:${args.join(":")}`
}


// export function getkey(key: string){
//   const client = initlializeRedisClient()
// }