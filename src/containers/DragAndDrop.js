import React, { Component } from 'react';
import HtmlTextArea from '../components/HtmlTextArea';
import Area from '../components/Area';
import Save from '../components/Save';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Grid, Row, Col  } from 'react-bootstrap';
class DragAndDrop extends Component {
    render() {
        return (
            <Grid  >
                <Row>
                    <Col  md={8}>   
                        <HtmlTextArea/>
                    </Col>
                    <Col className='area' md={4}>
                        <Area name='Page Url'/>
                        <Area name='Campaing'/>
                        <Area name='Referrer'/>
                        <Area name='Page Path'/>
                        <Area name='Page Hostname'/>
                        <Area name='View within session'/>
                        <Area name='Reutrning Visitor'/>
                        <Area name='Click Classes'/>
                        <Area name='Click ID'/>
                        <Area name='Click Url'/>
                        <Area name='Form ID'/>
                        <Area name='Form Classes'/>
                        <Area name='Form Url'/>
                    </Col>
                </Row>
                <Row>
                    <Save/>
                </Row>
            </Grid>
        );
    }
}
export default DragDropContext(HTML5Backend)(DragAndDrop);