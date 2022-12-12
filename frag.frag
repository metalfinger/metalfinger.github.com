#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation
    vec2 u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float circle(vec2 center, float radius, vec2 st) {
    float cirgrad = length(vec2(st.x, st.y) - center);
    return smoothstep(radius, radius + 0.03, cirgrad);
}


void main() {
    float aspect = u_resolution.y/u_resolution.x;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    

    //maintain aspect ratio
    st.y *= u_resolution.y/u_resolution.x;

    st *= 1.0;

    vec2 noiseST = st * 1.6;

    
    float timevar = u_time * .5;
    float grain = random((st * 100.0)) - 0.5;

    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(noiseST.x*2.0, noiseST.y);// + 5.0 * sin(u_time);
    // Use the noise function
    float n = noise(pos + timevar);

    vec2 pos1 = vec2(noiseST.x * 2., noiseST.y);//*500.0 + 500.0 * sin(timevar + PI/4.0));
    // Use the noise function
    float n1 = noise(pos1 + timevar * 2.0);

    vec2 pos2 = vec2(noiseST.x * 1.02, noiseST.y);// + 50.0 * sin(timevar + PI/8.0));
    // Use the noise function
    float n2 = noise(pos2 + timevar * -2.);


    
    n += grain * .0;
    n1 += grain * .1;
    n2 += grain * .4;

    

    //!1
    // vec3 color1 = vec3(253, 236, 248)/255.0;
    // vec3 color2 = vec3(252, 241, 185)/255.0;
    // vec3 color3 = vec3(193, 183, 236)/255.0;
    // vec3 color4 = vec3(192, 116, 203)/255.0;

    // !2
    // vec3 color1 = vec3(253, 236, 250)/255.0;
    // vec3 color2 = vec3(247, 120, 100)/255.0;
    // vec3 color3 = vec3(236, 79, 89)/255.0;
    // vec3 color4 = vec3(172, 70, 92)/255.0;

    //!3
    // vec3 color1 = vec3(253, 254, 245)/255.0;
    // vec3 color2 = vec3(254, 217, 80)/255.0;
    // vec3 color3 = vec3(197, 252, 136)/255.0;
    // vec3 color4 = vec3(93, 187, 252)/255.0;

    //!4
    // vec3 color1 = vec3(253, 254, 245)/255.0;
    // vec3 color2 = vec3(250, 253, 194)/255.0;
    // vec3 color3 = vec3(102, 182, 183)/255.0;
    // vec3 color4 = vec3(56, 157, 179)/255.0;

    //!5
    // vec3 color1 = vec3(252, 209, 87)/255.0;//vec3(250, 250, 208)/255.0;
    // vec3 color2 = vec3(252, 209, 87)/255.0;
    // vec3 color3 = vec3(240, 200, 63)/255.0;
    // vec3 color4 = vec3(142, 140, 23)/255.0;

    //!6
    // vec3 color1 = vec3(10, 10, 10)/255.0;//vec3(250, 250, 208)/255.0;
    // vec3 color2 = vec3(0, 0, 0)/255.0;
    // vec3 color3 = vec3(0, 0, 0)/255.0;
    // vec3 color4 = vec3(0, 0, 0)/255.0;

    //!Metalfinger
    vec3 color1 = vec3(10, 10, 10)/255.0;//vec3(250, 250, 208)/255.0;
    vec3 color2 = vec3(0.0118, 0.0157, 0.1725);
    vec3 color3 = vec3(0.0, 0.0078, 0.0471);
    vec3 color4 = vec3(0.0157, 0.2275, 0.2784);

    // vec3 color1 = color1/255.0;
    // vec3 color2 = color2/255.0;
    // vec3 color3 = color3/255.0;
    // vec3 color4 = color4/255.0;

    vec3 finalColor = mix(mix(mix(color4, color3, n2), color2, n1), color1, n);


    vec2 circenter = vec2(0.0);

    circenter.x = u_mouse.x/u_resolution.x;
    circenter.y = aspect*u_mouse.y/u_resolution.y;


    float cirrad = .0;

    cirrad = circle(circenter, .0, st);


    finalColor = finalColor + grain*0.05;

    vec3 circleColor = mix(finalColor, vec3(0.0, 0.0, 0.0), cirrad);

    finalColor = finalColor;

    gl_FragColor = vec4(finalColor, 1.0);
}