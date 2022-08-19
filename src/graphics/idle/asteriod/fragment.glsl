// @author Jan <LJ> Scheurer
    
    precision mediump float;
    uniform float uTime;
    uniform vec2 uResolution;
    
    #define ANAGLYPH
    
    #define time uTime*.5
    
    vec3 ro,rs;
    float rand(vec2 p){return fract(sin(dot(vec2(12.404,48.31243),p))*42634.653123);}
    float rand(vec3 p){return fract(sin(dot(vec3(12.404,23.5213,48.31243),p))*42634.653123);}
    const vec2 O=vec2(1,0);
    float noise(vec2 p){return texture(iChannel1,p/64.).r;}
    float noise(vec3 p){
        vec3 b=floor(p),f=fract(p);return mix(
            mix(mix(rand(b+O.yyy),rand(b+O.xyy),f.x),mix(rand(b+O.yxy),rand(b+O.xxy),f.x),f.y),
            mix(mix(rand(b+O.yyx),rand(b+O.xyx),f.x),mix(rand(b+O.yxx),rand(b+O.xxx),f.x),f.y),f.z);
    }
    float gn(vec2 p){return texture(iChannel2,p/128.).r*1.2+texture(iChannel1,p/32.).r*.1;}
    mat2 r2d(float a){float sa=sin(a),ca=cos(a);return mat2(ca,sa,-sa,ca);}
    float bmin(float a,float b,float k){return min(min(a,b),max(a,b)-k);}
    vec2 amod(vec2 p,float a){a=mod(atan(p.x,p.y),a)-a*.5;return vec2(cos(a),sin(a))*length(p);}
    float map(vec3 p){
        float a=0.,cid=rand(floor(p.xz/20.+.5)*10.),d=p.y+gn(p.xz*.1)*4.-1.;
        if(d<.5)
            d-=max(texture(iChannel2,p.xz*.05).g-.6,0.)*.2+
            max(6.-length(p),0.)+
            min(texture(iChannel2,p.xz).b,.5)*
            smoothstep(2.,0.,length(ro-p))*.01+
            max(gn(p.xz)-.8,0.)*.5
           ;
        vec3 o=p,q;
        p.xz=mod(p.xz+10.,20.)-10.;
        mat2 r=r2d(cid*.7-.3);
        p.y-=1.;
        if(length(o.xz)<7.)p.y-=4.+sin(time*.2),a=1.;
        p.yz*=r,p.xz*=r;
        q=p;q.yz*=r;
        p.xz*=r2d(p.y*.2);
        p=abs(p)-(vec2(2.-max(-p.y,0.)*.5,2.).xyx+vec3(gn(p.zy*vec2(.1,1)*1.5),gn(p.xz)*.5,gn(p.xy*vec2(.1,1)*1.5)));
        d=min(min(d,-length(o)+60.),bmin(
            length(max(p+noise(p*4.)*.3,0.))-.2-a,
            max(max(abs(q.x)+2.,abs(q.z)-3.*cid)-3.,abs(q.y-2.)-.4),
            .5
        )-cid);
        return min(d,max(
            noise(mod(o*5.+vec3(0,-time*3.*sign(o.y-3.5),0),100.)-50.)-.1-step(3.5,o.y)*.05,
            max(length(o.xz)-5.+noise(o.xy*.4)*2.,-o.y-5.))
       );
    }
    const vec2 N=vec2(.005,0);
    vec3 render(vec3 rd){
    float md;vec3 mp=ro;
        for(int i=0;i<70;i++)if(mp+=rd*(md=map(mp)),md<.001)break;
        vec3
            n=normalize(map(mp)-vec3(map(mp-N.xyy),map(mp-N.yxy),map(mp-N.yyx))),
            lp=vec3(-5.,9.,2.),
            l=normalize(lp-mp)
        ;
        float
            ao=map(mp+n*.5)*.1+map(mp+n*2.)*.05,
            falloff=max(1.-length(lp-mp)*.07,0.)
        ;
        falloff*=falloff;
        return pow(texture(iChannel2,mp.xz*.0005).rgb,vec3(3.))+
            mix(
                texture(iChannel2,mp.xz*.2).rgb*max(dot(n,l),0.)*3.*.03+texture(iChannel2,mp.xz).rgb*ao*.0375,
                vec3(.2,.15,.1)*.4+gn(rd.xy*3.+time*.1)*.1,
                smoothstep(-5.,50.,length(ro-mp)-gn(rd.xy*5.+time*.1)*10.)
            )*5.
        ;
            
    }
    
    void main(void){
        vec2 uv=gl_FragCoord/uResolution.xy,p=uv*2.-1.;
        p.x*=uResolution.x/uResolution.y;
        ro=vec3(-7.,-.5,13);
        vec3 rd=normalize(vec3(p*r2d(sin(time*.12)*.1),-1.3+length(p)*.2));
        mat2 rt=r2d(10.635+sin(time*.2)*.02);
        rd.yz*=r2d(-.35);
        ro.xz*=rt,rd.xz*=rt;
        gl_FragColor=vec4(0);
        #ifdef ANAGLYPH
        float focal=-.015;
        rs=rd;rs.xz*=r2d(focal);
        gl_FragColor.rgb += render(rs)*vec3(1,0,0);
        ro.xz+=vec2(.035,0)*rt;rs.xz=rd.xz*r2d(-focal);
        gl_FragColor.rgb += render(rs)*vec3(0,1,1);
        #else
        gl_FragColor.rgb += render(rd);
        #endif
        gl_FragColor.rgb = pow(gl_FragColor.rgb,vec3(1./2.2));
    gl_FragColor.rgb *= vec3(1.1,1.1,1.)*.9*max(1.-length(p)*.45+.7*uv.y*smoothstep(-.1,0.2,max(abs(p.x-.65-p.y*.2)-.32,p.y+p.x*.2-.5))*max(1.-abs(p.x-.8),0.)*2.*gn(p.xx*5.-p.y),0.);
    gl_FragColor.rgb = 1.1*mix(gl_FragColor.rgb,vec3(.43,.4,.4),(gn(p*3.+noise(vec3(p,time))-time)*noise(p))*.5);
    }
    