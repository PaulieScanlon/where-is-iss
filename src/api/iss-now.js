const axios = require('axios')

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(
      'https://api.wheretheiss.at/v1/satellites/25544'
    )

    res.status(200).json({ iss_now: data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
