const path = require('path')
const express = require('express')
const app = express()
const router = express.Router()


const { promises } = require('fs')
const { join } = require('path')
const { createCanvas } = require('@napi-rs/canvas')


app.use('/',router)

router.get('/', async (req, res)=>{
    const canvas = createCanvas(300, 320)
    const ctx = canvas.getContext('2d')
    
    ctx.lineWidth = 10
    ctx.strokeStyle = '#03a9f4'
    ctx.fillStyle = '#03a9f4'
    
    // Wall
    ctx.strokeRect(75, 140, 150, 110)
    
    // Door
    ctx.fillRect(130, 190, 40, 60)
    
    // Roof
    ctx.beginPath()
    ctx.moveTo(50, 140)
    ctx.lineTo(150, 60)
    ctx.lineTo(250, 140)
    ctx.closePath()
    ctx.stroke()

    const pngData = await canvas.encode('png') // JPEG, AVIF and WebP are also supported
    // encoding in libuv thread pool, non-blocking
    // await promises.writeFile('/tmp/simple.png', pngData)
    const b64png = Buffer(pngData).toString('base64');
    res.setHeader('Content-Type', 'image/png');

    return res.send(pngData)
})

app.listen(3000)
