import { useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

function Player() {
  let { playerId } = useParams()

  useEffect(() => {
    // Fetch post using the postSlug
  }, [playerId])

  return (
    <div className="home">
      <div className="container">
        <Link to="/blog/this-is-a-post-title">
          <div className="row align-items-center my-5">
            <div className="col-lg-7"></div>
            <div className="col-lg-5">
              <h1 className="font-weight-light">This is a post title</h1>
              <p>Joueur X</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Player
