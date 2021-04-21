// Run this, and plug the results in http://alexbeutel.com/webgl/voronoi.html
const WIDTH = 800
const HEIGHT = 800

function grid() {
  let n = 5
  let w = WIDTH/n
  let res = []

  for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
      let x = w/2 + i * w
      let y = w/2 + j * w
      res.push(x, y)
    }
  }
  return res
}

function honeycomb() {
  let n = 5
  let w = WIDTH/n
  let res = []

  for (let j=0; j<n; j++) {
    let n1 = ((j %2 == 1) ? n: n-1)
    for (let i=0; i<n1; i++) {
      let x = w/2 + i * w
      if (j%2 == 0) {
        x += w/2
      }
      let y = w/2 + j * w
      res.push(x, y)
    }
  }
  return res
}

function circlesInGrid() {
  let n = 3
  let w = WIDTH/n
  let res = []

  for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
      let x = w/2 + i * w
      let y = w/2 + j * w
      res.push(x, y)

      let n1 = 12
      let r = WIDTH/(2*n) - 30
      for (let k=0; k<n1; k++) {
        let x1 = x + r * Math.cos(360 * 0.0174533 * k/n1)
        let y1 = y + r * Math.sin(360 * 0.0174533 * k/n1)
        res.push(x1, y1)
      }
    }
  }
  return res
}

function circle() {
  let n = 12
  let r = 200
  let res = [WIDTH/2, WIDTH/2]
  for (let i=0; i<n; i++) {
    let x = WIDTH/2 + r * Math.cos(360 * 0.0174533 * i/n)
    let y = WIDTH/2 + r * Math.sin(360 * 0.0174533 * i/n)
    res.push(x, y)
  }
  return res
}

// concentric circles with center
function concentric() {
  let n = 12
  let res = [WIDTH/2, WIDTH/2]
  for (let r = 100; r < 360; r+=60) {
    for (let i=0; i<n; i++) {
      let x = WIDTH/2 + r * Math.cos(360 * 0.0174533 * i/n)
      let y = WIDTH/2 + r * Math.sin(360 * 0.0174533 * i/n)
      res.push(x, y)
    }
  }
  return res
}

function spiral() {
  let n = 12
  let res = [WIDTH/2, WIDTH/2]
  for (let i=0; i<n * 3; i++) {
    let x = WIDTH/2 + i * 10 * Math.cos(360 * 0.0174533 * i/n)
    let y = WIDTH/2 + i * 10 * Math.sin(360 * 0.0174533 * i/n)
    res.push(x, y)
  }
  return res
}

function triangle() {
  let n = 12
  let res = []
  for (let i=0; i<n; i++) {
    for (let j=0; j<=i; j++) {
      let x = 100 + j * 50
      let y = 100 + i * 50
      res.push(x, y)
    }
  }
  return res
}

function circlesOnCircle() {
  let n = 12
  let n1 = 6
  let r = 300
  let r1 = 50
  let res = [WIDTH/2, WIDTH/2]
  for (let i=0; i<n; i++) {
    let x = WIDTH/2 + r * Math.cos(360 * 0.0174533 * i/n)
    let y = WIDTH/2 + r * Math.sin(360 * 0.0174533 * i/n)
    res.push(x, y)

    for (let j=0; j<n1; j++) {
      let x1 = x + r1 * Math.cos(360 * 0.0174533 * j/n1)
      let y1 = y + r1 * Math.sin(360 * 0.0174533 * j/n1)
      res.push(x1, y1)
    }
  }
  return res
}

function perpLines() {
  let n = 7
  let w = WIDTH/n
  let res = []

  for (let i=0; i<n; i++) {
    let x = w/2 + i * w
    let y = WIDTH/2
    res.push(x, y)

    x = WIDTH/2 
    y = w/2 + i * w
    res.push(x, y)
  }
  return res
}

function sine() {
  let res = []
  for (let i=0; i<360; i+=10) {
    let x = (i*WIDTH/360)
    let y = WIDTH/2 + 100 * Math.sin(0.0174533 * i)
    //res.push(x, y)
    res.push(x, WIDTH/2 - 100 * Math.sin(0.0174533 * i))
  }
  return res
}

class PointBag {
  constructor() {
    this.points = {}
  }

  addPoint(x,y) { 
    let x1 = Math.round(x * 100)/100
    let y1 = Math.round(y * 100)/100
    let key = x1+','+y1
    if (!this.points[key]) {
      this.points[key] = [x1, y1]
    }
  }
  
  getPoints() {
    return Object.values(this.points).flat()
  }
}

function sierpinski(n) {
  let points = new PointBag()
  function sier(x1,y1,x2,y2,x3,y3,n) {
    if (n == 0) {
      points.addPoint(x1,y1)
      points.addPoint(x2,y2)
      points.addPoint(x3,y3)
    } else {
      let p1 = [(x1+x2)/2, (y1+y2)/2]
      let p2 = [(x2+x3)/2, (y2+y3)/2]
      let p3 = [(x3+x1)/2, (y3+y1)/2]
      sier(x1, y1, p1[0], p1[1], p3[0], p3[1], n-1)
      sier(x2, y2, p1[0], p1[1], p2[0], p2[1], n-1)
      sier(x3, y3, p2[0], p2[1], p3[0], p3[1], n-1)
    }
  }

  sier(WIDTH/2, 10, 10, WIDTH-10, WIDTH-10, WIDTH-10, n)
  return points.getPoints()
}

// http://geekraj.com/?p=1056
function angel() {
  let n = 60
  let res = []
  for (let i = 0; i < n; i++) {
    let t = i * 0.0174533 * 360/n
    let x = WIDTH/2 + 200 * (1 + Math.sin(t)) * Math.cos(t) 
    let y = WIDTH/2 - 200 * (1 + Math.sin(3 * t)) * Math.sin(t) 
    res.push(x, y)
  }
  return res
}

let data = {
  sites: angel(),
  queries: []
}
console.log(JSON.stringify(data))