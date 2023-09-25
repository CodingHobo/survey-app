import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'
import Button from '../components/shared/Button'

function AboutPage() {
  return (
    <Card>
      <div className='about'>
        <h1>About this Demo</h1>
        <p>This is a React app to leave and collect
          feedback for a product or service.
        </p>
        <p>Version 1.0.1</p>
        <p>Tech Stack: React | Firebase | Framer Motion </p>
        <p>JSON Server + Concurrently (during development) </p>
        <p>
          <Link to='/'><Button>
            Home
          </Button></Link>
        </p>
      </div>
    </Card>
  )
}
export default AboutPage