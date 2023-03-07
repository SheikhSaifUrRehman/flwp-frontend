import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

const Help = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='help-page'>
      <div className='container my-5 py-4 px-3'>
        <h3 className='mb-4'>FreeLancer Workplace Privacy Policy</h3>

        <Accordion defaultActiveKey='0'>
          <Card>
            <Card.Header>
              <p className='mb-0 text-white pt-2'>
                What kind of insurance does FreeLancer Workplace offer?
              </p>
              <Accordion.Toggle
                as={Button}
                variant='link'
                eventKey='0'
              >
                +
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
              FreeLancer Workplace doesn’t insure your personal loss but if
                some damage is done by the worker , FreeLancer Workplace will ban
                that worker from the application for a period of time.
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <p className='mb-0 text-white pt-2'>
                {' '}
                do I have to pay any charges for registeration?
              </p>
              <Accordion.Toggle
                as={Button}
                variant='link'
                eventKey='1'
              >
                +
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>
                No, your registration is completely free for now.
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <p className='mb-0 text-white pt-2'>
                do I have to pay any charges for posting job?
              </p>
              <Accordion.Toggle
                as={Button}
                variant='link'
                eventKey='2'
              >
                +
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='2'>
              <Card.Body>No , you can post a job for free now</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <p className='mb-0 text-white pt-2'>
                Will my personal information be private?
              </p>
              <Accordion.Toggle
                as={Button}
                variant='link'
                eventKey='3'
              >
                +
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='3'>
              <Card.Body>
                We take the security of all user personal information
                extremely seriously and any sensitive information
                provided by the user while posting a task is handled
                carefully in accordance with our Privacy Policy. We
                make sure that your personal information is not shown
                to the other users
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <p className='mb-0 text-white pt-2'>
                How can I hire the best worker for my work?
              </p>
              <Accordion.Toggle
                as={Button}
                variant='link'
                eventKey='4'
              >
                +
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='4'>
              <Card.Body>
              FreeLancer Workplace application consist of hundreds of profiles
                of workers , our algorithm ensures only the best fit
                will be shown to you.
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <p className='mb-0 text-white pt-2'>
                At what time workers will be avalible?
              </p>
              <Accordion.Toggle
                as={Button}
                variant='link'
                eventKey='5'
              >
                +
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='5'>
              <Card.Body>
                Our application ensures the avalibilty of worker 24/7
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
};
export default Help;
