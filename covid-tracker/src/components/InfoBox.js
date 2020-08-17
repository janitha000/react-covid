import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import numeral from 'numeral'
import './InfoBox.css'

const InfoBox = ({ title, cases, total, active, ...props }) => {
    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${title === 'Recovered' && 'infoBox--green'}`} onClick={props.onClick}>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">{title} </Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography color="textSecondary" className="infoBox__total">{numeral(total).format("0,0")} Total</Typography>
            </CardContent>
        </Card>
    )

}

export default InfoBox;