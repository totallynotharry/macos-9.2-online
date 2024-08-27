var E=(o,r,t)=>{if(!r.has(o))throw TypeError("Cannot "+t)};var a=(o,r,t)=>(E(o,r,"read from private field"),t?t.call(o):r.get(o)),l=(o,r,t)=>{if(r.has(o))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(o):r.set(o,t)},c=(o,r,t,i)=>(E(o,r,"write to private field"),i?i.call(o,t):r.set(o,t),t);var P=(o,r,t)=>(E(o,r,"access private method"),t);class L{static getStorageForCapacity(r,t){if(!t.BYTES_PER_ELEMENT)throw"Pass in a ArrayBuffer subclass";var i=8+(r+1)*t.BYTES_PER_ELEMENT;return new SharedArrayBuffer(i)}constructor(r,t){if(!ArrayBuffer.__proto__.isPrototypeOf(t)&&t.BYTES_PER_ELEMENT!==void 0)throw"Pass a concrete typed array class as second argument";this._type=t,this._capacity=(r.byteLength-8)/t.BYTES_PER_ELEMENT,this.buf=r,this.write_ptr=new Uint32Array(this.buf,0,1),this.read_ptr=new Uint32Array(this.buf,4,1),this.storage=new t(this.buf,8,this._capacity)}type(){return this._type.name}push(r,t){var i=Atomics.load(this.read_ptr,0),s=Atomics.load(this.write_ptr,0);if((s+1)%this._storage_capacity()==i)return 0;var h=t??r.length;let e=Math.min(this._available_write(i,s),h),_=Math.min(this._storage_capacity()-s,e),p=e-_;return this._copy(r,0,this.storage,s,_),this._copy(r,_,this.storage,0,p),Atomics.store(this.write_ptr,0,(s+e)%this._storage_capacity()),e}writeCallback(r,t){var i=Atomics.load(this.read_ptr,0),s=Atomics.load(this.write_ptr,0);if((s+1)%this._storage_capacity()==i)return 0;let h=Math.min(this._available_write(i,s),r),e=Math.min(this._storage_capacity()-s,h),_=h-e;var p=new this._type(this.storage.buffer,8+s*4,e),b=new this._type(this.storage.buffer,8,_);return t(p,b),Atomics.store(this.write_ptr,0,(s+h)%this._storage_capacity()),h}pop(r,t){var i=Atomics.load(this.read_ptr,0),s=Atomics.load(this.write_ptr,0);if(s==i)return 0;var h=t??r.length;let e=Math.min(this._available_read(i,s),h),_=Math.min(this._storage_capacity()-i,e),p=e-_;return this._copy(this.storage,i,r,0,_),this._copy(this.storage,0,r,_,p),Atomics.store(this.read_ptr,0,(i+e)%this._storage_capacity()),e}empty(){var r=Atomics.load(this.read_ptr,0),t=Atomics.load(this.write_ptr,0);return t==r}full(){var r=Atomics.load(this.read_ptr,0),t=Atomics.load(this.write_ptr,0);return(t+1)%this._storage_capacity()==r}capacity(){return this._capacity-1}available_read(){var r=Atomics.load(this.read_ptr,0),t=Atomics.load(this.write_ptr,0);return this._available_read(r,t)}available_write(){var r=Atomics.load(this.read_ptr,0),t=Atomics.load(this.write_ptr,0);return this._available_write(r,t)}_available_read(r,t){return(t+this._storage_capacity()-r)%this._storage_capacity()}_available_write(r,t){return this.capacity()-this._available_read(r,t)}_storage_capacity(){return this._capacity}_copy(r,t,i,s,h){for(var e=0;e<h;e++)i[s+e]=r[t+e]}}const M=384*2*2;var g;class B{constructor(r){l(this,g,void 0);c(this,g,new L(r.audioBuffer,Uint8Array))}audioData(){if(a(this,g).empty())return;const r=a(this,g).available_read(),t=new Uint8Array(Math.min(r,M));return a(this,g).pop(t),t}}g=new WeakMap;var y;class U{constructor(r){l(this,y,[]);r.port.onmessage=t=>{t.data.type==="data"?a(this,y).push(t.data.data):t.data.type==="reset"&&c(this,y,[])}}audioData(){return a(this,y).shift()}}y=new WeakMap;var d,m,n,f,u,w,v,A,S,D,R;class C extends AudioWorkletProcessor{constructor(t){super();l(this,A);l(this,D);l(this,d,void 0);l(this,m,void 0);l(this,n,void 0);l(this,f,void 0);l(this,u,0);l(this,w,-1);l(this,v,-1);c(this,d,t.processorOptions);const{config:i}=a(this,d);i.type==="shared-memory"?c(this,m,new B(i)):c(this,m,new U(this))}process(t,i,s){var _;const h=i[0],e=h[0].length;for(let p=0;p<e;p++)for(const b of h)try{b[p]=P(this,A,S).call(this)}catch(T){currentTime-a(this,v)>1&&(console.error(`Could not generate sample (size=${(_=a(this,n))==null?void 0:_.byteLength} offset=${a(this,u)})`,T),c(this,v,currentTime)),b[p]=0}return!0}}d=new WeakMap,m=new WeakMap,n=new WeakMap,f=new WeakMap,u=new WeakMap,w=new WeakMap,v=new WeakMap,A=new WeakSet,S=function(){if((!a(this,n)||a(this,n).byteLength===a(this,u))&&(c(this,n,a(this,m).audioData()),c(this,u,0),a(this,n)&&(c(this,f,new DataView(a(this,n).buffer,a(this,n).byteOffset)),a(this,d).debug)),!a(this,n)||!a(this,f)||a(this,n).byteLength===a(this,u))return a(this,d).debug&&currentTime-a(this,w)>1&&(console.warn("No audio data, generating silence"),c(this,w,currentTime)),0;switch(a(this,d).sampleSize){case 16:{const t=a(this,f).getInt16(a(this,u));return c(this,u,a(this,u)+2),t/32768}case 8:{const t=a(this,f).getInt8(a(this,u));return c(this,u,a(this,u)+1),t/128}default:throw new Error(`Unsupported sample size: ${a(this,d).sampleSize}`)}},D=new WeakSet,R=function(){if(!a(this,n)||!a(this,f))return;const t=[];let i=1;const s=a(this,d).sampleSize>>3;for(let h=0;h<a(this,n).byteLength;h+=s){const e=(s===2?a(this,f).getUint16(h):a(this,f).getUint8(h)).toString(16);if(t.length>0&&t[t.length-1]===e){i++;continue}i>1&&(t[t.length-1]+=`•${i}`),i=1,t.push(e)}t.length===1&&t[0]==="0"||(i>1&&(t[t.length-1]+=`•${i}`),console.log("Got audio data: "+t.join(" ")))};registerProcessor("emulator-playback-processor",C);
