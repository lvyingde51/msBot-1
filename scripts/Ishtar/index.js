const Axios = require('axios')

let Ishtar = (()=>{

  let fetchCard = (input)=>{
    return Axios(`http://api.ishtar-collective.net/cards/${input}`)
  }

  return {
    grimoire: async (input)=>{
      try {
        let res = await fetchCard(input)
        return res.data
      } catch (err) {
        console.log(`Error fetching grimoire from Ishtar API with ${input}: ${err}`)
      }
    }
  }

})()

module.exports = Ishtar