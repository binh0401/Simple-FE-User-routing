import { Card, Row, Col, Badge, Button, CardBody, CardTitle, CardText } from "react-bootstrap"
import ActionButton from "./ActionButton"


const SinglePost = ({post: {_id, status, title, description, url}}) => {


  return <Card className="shadow" border={status=== 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
    <CardBody>
      <CardTitle>
        <Row>
          <Col>
            <p className="post-title">{title}</p>
            <Badge pill variant={status=== 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
                {status}
            </Badge>
          </Col>
          <Col className="text-right">
            <ActionButton url={url} _id={_id}/>
          </Col>
        </Row>
      </CardTitle>
      <CardText>
        {description}
      </CardText>
    </CardBody>
  </Card>
}

export default SinglePost
