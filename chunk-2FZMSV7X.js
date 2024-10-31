import{a as V,b as ne}from"./chunk-MREYYICM.js";import{a as b,b as xe,c as ye,f as Ge,g as Be,h as Pe,j as Se,l as Te,m as Ce,n as ve,o as Ue,p as Me}from"./chunk-ME2XCC64.js";import{$ as oe,H as B,K as ce,N as ie,R as de,S as W,T as pe,V as he,W as P,Y as N,Z as le,a as y,b as ue,da as j,f as se,fa as fe,g as d,h as G,ha as me,ja as K,l as O,la as q,na as ge,oa as Y,qa as $,ua as _e,va as be,y as I}from"./chunk-K3QIDESX.js";var S=class{init(){let e=new q({uTransformMatrix:{value:new O,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),t=j({name:"graphics",bits:[fe,me(pe()),be,K]});this.shader=new Y({gpuProgram:t,resources:{localUniforms:e}})}execute(e,t){let r=t.context,s=r.customShader||this.shader,i=e.renderer,o=i.graphicsContext,{batcher:n,instructions:u}=o.getContextRenderData(r),c=i.encoder;c.setPipelineFromGeometryProgramAndState(n.geometry,s.gpuProgram,e.state),c.setGeometry(n.geometry,s.gpuProgram);let f=i.globalUniforms.bindGroup;c.setBindGroup(0,f,s.gpuProgram);let h=i.renderPipes.uniformBatch.getUniformBindGroup(s.resources.localUniforms,!0);c.setBindGroup(2,h,s.gpuProgram);let l=u.instructions;for(let p=0;p<u.instructionSize;p++){let m=l[p];if(s.groups[1]=m.bindGroup,!m.gpuBindGroup){let re=m.textures;m.bindGroup=V(re.textures,re.count),m.gpuBindGroup=i.bindGroup.getBindGroup(m.bindGroup,s.gpuProgram,1)}c.setBindGroup(1,m.bindGroup,s.gpuProgram),c.renderPassEncoder.drawIndexed(m.size,1,m.start)}}destroy(){this.shader.destroy(!0),this.shader=null}};S.extension={type:[d.WebGPUPipesAdaptor],name:"graphics"};var T=class{init(){let e=j({name:"mesh",bits:[_e,ye,K]});this._shader=new Y({gpuProgram:e,resources:{uTexture:ie.EMPTY._source,uSampler:ie.EMPTY._source.style,textureUniforms:{uTextureMatrix:{type:"mat3x3<f32>",value:new O}}}})}execute(e,t){let r=e.renderer,s=t._shader;if(!s)s=this._shader,s.groups[2]=r.texture.getTextureBindGroup(t.texture);else if(!s.gpuProgram){I("Mesh shader has no gpuProgram",t.shader);return}let i=s.gpuProgram;if(i.autoAssignGlobalUniforms&&(s.groups[0]=r.globalUniforms.bindGroup),i.autoAssignLocalUniforms){let o=e.localUniforms;s.groups[1]=r.renderPipes.uniformBatch.getUniformBindGroup(o,!0)}r.encoder.draw({geometry:t._geometry,shader:s,state:t.state})}destroy(){this._shader.destroy(!0),this._shader=null}};T.extension={type:[d.WebGPUPipesAdaptor],name:"mesh"};var X=$.for2d(),C=class{start(e,t,r){let s=e.renderer,i=s.encoder,o=r.gpuProgram;this._shader=r,this._geometry=t,i.setGeometry(t,o),X.blendMode="normal",s.pipeline.getPipeline(t,o,X);let n=s.globalUniforms.bindGroup;i.resetBindGroup(1),i.setBindGroup(0,n,o)}execute(e,t){let r=this._shader.gpuProgram,s=e.renderer,i=s.encoder;if(!t.bindGroup){let u=t.textures;t.bindGroup=V(u.textures,u.count)}X.blendMode=t.blendMode;let o=s.bindGroup.getBindGroup(t.bindGroup,r,1),n=s.pipeline.getPipeline(this._geometry,r,X);t.bindGroup._touch(s.textureGC.count),i.setPipeline(n),i.renderPassEncoder.setBindGroup(1,o),i.renderPassEncoder.drawIndexed(t.size,1,t.start)}};C.extension={type:[d.WebGPUPipesAdaptor],name:"batch"};var v=class{constructor(e){this._hash=Object.create(null),this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_hash")}contextChange(e){this._gpu=e}getBindGroup(e,t,r){return e._updateKey(),this._hash[e._key]||this._createBindGroup(e,t,r)}_createBindGroup(e,t,r){let s=this._gpu.device,i=t.layout[r],o=[],n=this._renderer;for(let f in i){let h=e.resources[f]??e.resources[i[f]],l;if(h._resourceType==="uniformGroup"){let p=h;n.ubo.updateUniformGroup(p);let m=p.buffer;l={buffer:n.buffer.getGPUBuffer(m),offset:0,size:m.descriptor.size}}else if(h._resourceType==="buffer"){let p=h;l={buffer:n.buffer.getGPUBuffer(p),offset:0,size:p.descriptor.size}}else if(h._resourceType==="bufferResource"){let p=h;l={buffer:n.buffer.getGPUBuffer(p.buffer),offset:p.offset,size:p.size}}else if(h._resourceType==="textureSampler"){let p=h;l=n.texture.getGpuSampler(p)}else if(h._resourceType==="textureSource"){let p=h;l=n.texture.getGpuSource(p).createView({})}o.push({binding:i[f],resource:l})}let u=n.shader.getProgramData(t).bindGroups[r],c=s.createBindGroup({layout:u,entries:o});return this._hash[e._key]=c,c}destroy(){for(let e of Object.keys(this._hash))this._hash[e]=null;this._hash=null,this._renderer=null}};v.extension={type:[d.WebGPUSystem],name:"bindGroup"};var U=class{constructor(e){this._gpuBuffers=Object.create(null),this._managedBuffers=[],e.renderableGC.addManagedHash(this,"_gpuBuffers")}contextChange(e){this._gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){let t=this._gpuBuffers[e.uid]||this.createGPUBuffer(e),r=e.data;return e._updateID&&r&&(e._updateID=0,this._gpu.device.queue.writeBuffer(t,0,r.buffer,0,(e._updateSize||r.byteLength)+3&-4)),t}destroyAll(){for(let e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){this._gpuBuffers[e.uid]||(e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),this._managedBuffers.push(e));let t=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(he(e.data.buffer,t.getMappedRange()),t.unmap()),this._gpuBuffers[e.uid]=t,t}onBufferChange(e){this._gpuBuffers[e.uid].destroy(),e._updateID=0,this._gpuBuffers[e.uid]=this.createGPUBuffer(e)}onBufferDestroy(e){this._managedBuffers.splice(this._managedBuffers.indexOf(e),1),this._destroyBuffer(e)}destroy(){this._managedBuffers.forEach(e=>this._destroyBuffer(e)),this._managedBuffers=null,this._gpuBuffers=null}_destroyBuffer(e){this._gpuBuffers[e.uid].destroy(),e.off("update",this.updateBuffer,this),e.off("change",this.onBufferChange,this),e.off("destroy",this.onBufferDestroy,this),this._gpuBuffers[e.uid]=null}};U.extension={type:[d.WebGPUSystem],name:"buffer"};var M=class{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){this._renderer=null,this._colorMaskCache=null}};M.extension={type:[d.WebGPUSystem],name:"colorMask"};var x=class{constructor(e){this._renderer=e}init(e){return se(this,null,function*(){return this._initPromise?this._initPromise:(this._initPromise=this._createDeviceAndAdaptor(e).then(t=>{this.gpu=t,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)})}contextChange(e){this._renderer.gpu=e}_createDeviceAndAdaptor(e){return se(this,null,function*(){let t=yield B.get().getNavigator().gpu.requestAdapter({powerPreference:e.powerPreference,forceFallbackAdapter:e.forceFallbackAdapter}),r=["texture-compression-bc","texture-compression-astc","texture-compression-etc2"].filter(i=>t.features.has(i)),s=yield t.requestDevice({requiredFeatures:r});return{adapter:t,device:s}})}destroy(){this.gpu=null,this._renderer=null}};x.extension={type:[d.WebGPUSystem],name:"device"};x.defaultOptions={powerPreference:void 0,forceFallbackAdapter:!1};var E=class{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}renderStart(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e){this.endRenderPass(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(e.descriptor)}endRenderPass(){this.renderPassEncoder&&this.renderPassEncoder.end(),this.renderPassEncoder=null}setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,t,r,s){let i=this._renderer.pipeline.getPipeline(e,t,r,s);this.setPipeline(i)}setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,t){this._boundVertexBuffer[e]!==t&&(this._boundVertexBuffer[e]=t,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(t)))}_setIndexBuffer(e){if(this._boundIndexBuffer===e)return;this._boundIndexBuffer=e;let t=e.data.BYTES_PER_ELEMENT===2?"uint16":"uint32";this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),t)}resetBindGroup(e){this._boundBindGroup[e]=null}setBindGroup(e,t,r){if(this._boundBindGroup[e]===t)return;this._boundBindGroup[e]=t,t._touch(this._renderer.textureGC.count);let s=this._renderer.bindGroup.getBindGroup(t,r,e);this.renderPassEncoder.setBindGroup(e,s)}setGeometry(e,t){let r=this._renderer.pipeline.getBufferNamesToBind(e,t);for(let s in r)this._setVertexBuffer(s,e.attributes[r[s]].buffer);e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,t){for(let r in e.groups){let s=e.groups[r];t||this._syncBindGroup(s),this.setBindGroup(r,s,e.gpuProgram)}}_syncBindGroup(e){for(let t in e.resources){let r=e.resources[t];r.isUniformGroup&&this._renderer.ubo.updateUniformGroup(r)}}draw(e){let{geometry:t,shader:r,state:s,topology:i,size:o,start:n,instanceCount:u,skipSync:c}=e;this.setPipelineFromGeometryProgramAndState(t,r.gpuProgram,s,i),this.setGeometry(t,r.gpuProgram),this._setShaderBindGroups(r,c),t.indexBuffer?this.renderPassEncoder.drawIndexed(o||t.indexBuffer.data.length,u||t.instanceCount,n||0):this.renderPassEncoder.draw(o||t.getSize(),u||t.instanceCount,n||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished(),this.commandEncoder=null}restoreRenderPass(){let e=this._renderer.renderTarget.adaptor.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);let t=this._boundPipeline,r=y({},this._boundVertexBuffer),s=this._boundIndexBuffer,i=y({},this._boundBindGroup);this._clearCache();let o=this._renderer.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this.setPipeline(t);for(let n in r)this._setVertexBuffer(n,r[n]);for(let n in i)this.setBindGroup(n,i[n],null);this._setIndexBuffer(s)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){this._renderer=null,this._gpu=null,this._boundBindGroup=null,this._boundVertexBuffer=null,this._boundIndexBuffer=null,this._boundPipeline=null}contextChange(e){this._gpu=e}};E.extension={type:[d.WebGPUSystem],name:"encoder",priority:1};var w=class{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:P.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){let r=this._renderTargetStencilState[this._activeRenderTarget.uid];r.stencilMode=e,r.stencilReference=t;let s=this._renderer;s.pipeline.setStencilMode(e),s.encoder.renderPassEncoder.setStencilReference(t)}destroy(){this._renderer.renderTarget.onRenderTargetChange.remove(this),this._renderer=null,this._activeRenderTarget=null,this._renderTargetStencilState=null}};w.extension={type:[d.WebGPUSystem],name:"stencil"};var R={i32:{align:4,size:4},u32:{align:4,size:4},f32:{align:4,size:4},f16:{align:2,size:2},"vec2<i32>":{align:8,size:8},"vec2<u32>":{align:8,size:8},"vec2<f32>":{align:8,size:8},"vec2<f16>":{align:4,size:4},"vec3<i32>":{align:16,size:12},"vec3<u32>":{align:16,size:12},"vec3<f32>":{align:16,size:12},"vec3<f16>":{align:8,size:6},"vec4<i32>":{align:16,size:16},"vec4<u32>":{align:16,size:16},"vec4<f32>":{align:16,size:16},"vec4<f16>":{align:8,size:8},"mat2x2<f32>":{align:8,size:16},"mat2x2<f16>":{align:4,size:8},"mat3x2<f32>":{align:8,size:24},"mat3x2<f16>":{align:4,size:12},"mat4x2<f32>":{align:8,size:32},"mat4x2<f16>":{align:4,size:16},"mat2x3<f32>":{align:16,size:32},"mat2x3<f16>":{align:8,size:16},"mat3x3<f32>":{align:16,size:48},"mat3x3<f16>":{align:8,size:24},"mat4x3<f32>":{align:16,size:64},"mat4x3<f16>":{align:8,size:32},"mat2x4<f32>":{align:16,size:32},"mat2x4<f16>":{align:8,size:16},"mat3x4<f32>":{align:16,size:48},"mat3x4<f16>":{align:8,size:24},"mat4x4<f32>":{align:16,size:64},"mat4x4<f16>":{align:8,size:32}};function Ee(a){let e=a.map(r=>({data:r,offset:0,size:0})),t=0;for(let r=0;r<e.length;r++){let s=e[r],i=R[s.data.type].size,o=R[s.data.type].align;if(!R[s.data.type])throw new Error(`[Pixi.js] WebGPU UniformBuffer: Unknown type ${s.data.type}`);s.data.size>1&&(i=Math.max(i,o)*s.data.size),t=Math.ceil(t/o)*o,s.size=i,s.offset=t,t+=i}return t=Math.ceil(t/16)*16,{uboElements:e,size:t}}function we(a,e){let{size:t,align:r}=R[a.data.type],s=(r-t)/4;return`
         v = uv.${a.data.name};
         ${e!==0?`offset += ${e};`:""}

         arrayOffset = offset;

         t = 0;

         for(var i=0; i < ${a.data.size*(t/4)}; i++)
         {
             for(var j = 0; j < ${t/4}; j++)
             {
                 data[arrayOffset++] = v[t++];
             }
             ${s!==0?`arrayOffset += ${s};`:""}
         }
     `}function Re(a){return Se(a,"uboWgsl",we,Te)}var L=class extends Pe{constructor(){super({createUboElements:Ee,generateUboSync:Re})}};L.extension={type:[d.WebGPUSystem],name:"ubo"};var Z=class{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);let t=this.byteIndex,r=t+e*4;if(r=Math.ceil(r/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,r>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=r,t}addGroup(e){let t=this.addEmptyGroup(e.length);for(let r=0;r<e.length;r++)this.data[t/4+r]=e[r];return t}destroy(){this._buffer.destroy(),this._buffer=null,this.data=null}};var _=128,A=class{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_bindGroupHash"),this._batchBuffer=new Z({minUniformOffsetAlignment:_});let t=256/_;for(let r=0;r<t;r++){let s=N.UNIFORM|N.COPY_DST;r===0&&(s|=N.COPY_SRC),this._buffers.push(new le({data:this._batchBuffer.data,usage:s}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){for(let e in this._bindGroupHash)this._bindGroupHash[e]=null;this._batchBuffer.clear()}getUniformBindGroup(e,t){if(!t&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.ubo.ensureUniformGroup(e);let r=e.buffer.data,s=this._batchBuffer.addEmptyGroup(r.length);return this._renderer.ubo.syncUniformGroup(e,this._batchBuffer.data,s/4),this._bindGroupHash[e.uid]=this._getBindGroup(s/_),this._bindGroupHash[e.uid]}getUboResource(e){this._renderer.ubo.updateUniformGroup(e);let t=e.buffer.data,r=this._batchBuffer.addGroup(t);return this._getBufferResource(r/_)}getArrayBindGroup(e){let t=this._batchBuffer.addGroup(e);return this._getBindGroup(t/_)}getArrayBufferResource(e){let r=this._batchBuffer.addGroup(e)/_;return this._getBufferResource(r)}_getBufferResource(e){if(!this._bufferResources[e]){let t=this._buffers[e%2];this._bufferResources[e]=new Ce({buffer:t,offset:(e/2|0)*256,size:_})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){let t=new W({0:this._getBufferResource(e)});this._bindGroups[e]=t}return this._bindGroups[e]}_uploadBindGroups(){let e=this._renderer.buffer,t=this._buffers[0];t.update(this._batchBuffer.byteIndex),e.updateBuffer(t);let r=this._renderer.gpu.device.createCommandEncoder();for(let s=1;s<this._buffers.length;s++){let i=this._buffers[s];r.copyBufferToBuffer(e.getGPUBuffer(t),_,e.getGPUBuffer(i),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([r.finish()])}destroy(){for(let e=0;e<this._bindGroups.length;e++)this._bindGroups[e].destroy();this._bindGroups=null,this._bindGroupHash=null;for(let e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers=null;for(let e=0;e<this._bufferResources.length;e++)this._bufferResources[e].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._bindGroupHash=null,this._renderer=null}};A.extension={type:[d.WebGPUPipes],name:"uniformBatch"};var Oe={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function Ie(a,e,t,r,s){return a<<24|e<<16|t<<10|r<<5|s}function We(a,e,t,r){return t<<6|a<<3|r<<1|e}var D=class{constructor(e){this._moduleCache=Object.create(null),this._bufferLayoutsCache=Object.create(null),this._bindingNamesCache=Object.create(null),this._pipeCache=Object.create(null),this._pipeStateCaches=Object.create(null),this._colorMask=15,this._multisampleCount=1,this._renderer=e}contextChange(e){this._gpu=e,this.setStencilMode(P.DISABLED),this._updatePipeHash()}setMultisampleCount(e){this._multisampleCount!==e&&(this._multisampleCount=e,this._updatePipeHash())}setRenderTarget(e){this._multisampleCount=e.msaaSamples,this._depthStencilAttachment=e.descriptor.depthStencilAttachment?1:0,this._updatePipeHash()}setColorMask(e){this._colorMask!==e&&(this._colorMask=e,this._updatePipeHash())}setStencilMode(e){this._stencilMode!==e&&(this._stencilMode=e,this._stencilState=Ue[e],this._updatePipeHash())}setPipeline(e,t,r,s){let i=this.getPipeline(e,t,r);s.setPipeline(i)}getPipeline(e,t,r,s){e._layoutKey||(ve(e,t.attributeData),this._generateBufferKey(e)),s=s||e.topology;let i=Ie(e._layoutKey,t._layoutKey,r.data,r._blendModeId,Oe[s]);return this._pipeCache[i]?this._pipeCache[i]:(this._pipeCache[i]=this._createPipeline(e,t,r,s),this._pipeCache[i])}_createPipeline(e,t,r,s){let i=this._gpu.device,o=this._createVertexBufferLayouts(e,t),n=this._renderer.state.getColorTargets(r);n[0].writeMask=this._stencilMode===P.RENDERING_MASK_ADD?0:this._colorMask;let u=this._renderer.shader.getProgramData(t).pipeline,c={vertex:{module:this._getModule(t.vertex.source),entryPoint:t.vertex.entryPoint,buffers:o},fragment:{module:this._getModule(t.fragment.source),entryPoint:t.fragment.entryPoint,targets:n},primitive:{topology:s,cullMode:r.cullMode},layout:u,multisample:{count:this._multisampleCount},label:"PIXI Pipeline"};return this._depthStencilAttachment&&(c.depthStencil=ue(y({},this._stencilState),{format:"depth24plus-stencil8",depthWriteEnabled:r.depthTest,depthCompare:r.depthTest?"less":"always"})),i.createRenderPipeline(c)}_getModule(e){return this._moduleCache[e]||this._createModule(e)}_createModule(e){let t=this._gpu.device;return this._moduleCache[e]=t.createShaderModule({code:e}),this._moduleCache[e]}_generateBufferKey(e){let t=[],r=0,s=Object.keys(e.attributes).sort();for(let o=0;o<s.length;o++){let n=e.attributes[s[o]];t[r++]=n.offset,t[r++]=n.format,t[r++]=n.stride,t[r++]=n.instance}let i=t.join("|");return e._layoutKey=oe(i,"geometry"),e._layoutKey}_generateAttributeLocationsKey(e){let t=[],r=0,s=Object.keys(e.attributeData).sort();for(let o=0;o<s.length;o++){let n=e.attributeData[s[o]];t[r++]=n.location}let i=t.join("|");return e._attributeLocationsKey=oe(i,"programAttributes"),e._attributeLocationsKey}getBufferNamesToBind(e,t){let r=e._layoutKey<<16|t._attributeLocationsKey;if(this._bindingNamesCache[r])return this._bindingNamesCache[r];let s=this._createVertexBufferLayouts(e,t),i=Object.create(null),o=t.attributeData;for(let n=0;n<s.length;n++)for(let u in o)if(o[u].location===n){i[n]=u;break}return this._bindingNamesCache[r]=i,i}_createVertexBufferLayouts(e,t){t._attributeLocationsKey||this._generateAttributeLocationsKey(t);let r=e._layoutKey<<16|t._attributeLocationsKey;if(this._bufferLayoutsCache[r])return this._bufferLayoutsCache[r];let s=[];return e.buffers.forEach(i=>{let o={arrayStride:0,stepMode:"vertex",attributes:[]},n=o.attributes;for(let u in t.attributeData){let c=e.attributes[u];(c.divisor??1)!==1&&I(`Attribute ${u} has an invalid divisor value of '${c.divisor}'. WebGPU only supports a divisor value of 1`),c.buffer===i&&(o.arrayStride=c.stride,o.stepMode=c.instance?"instance":"vertex",n.push({shaderLocation:t.attributeData[u].location,offset:c.offset,format:c.format}))}n.length&&s.push(o)}),this._bufferLayoutsCache[r]=s,s}_updatePipeHash(){let e=We(this._stencilMode,this._multisampleCount,this._colorMask,this._depthStencilAttachment);this._pipeStateCaches[e]||(this._pipeStateCaches[e]=Object.create(null)),this._pipeCache=this._pipeStateCaches[e]}destroy(){this._renderer=null,this._bufferLayoutsCache=null}};D.extension={type:[d.WebGPUSystem],name:"pipeline"};var J=class{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}};var Q=class{init(e,t){this._renderer=e,this._renderTargetSystem=t}copyToTexture(e,t,r,s,i){let o=this._renderer,n=this._getGpuColorTexture(e),u=o.texture.getGpuSource(t.source);return o.encoder.commandEncoder.copyTextureToTexture({texture:n,origin:r},{texture:u,origin:i},s),t}startRenderPass(e,t=!0,r,s){let o=this._renderTargetSystem.getGpuRenderTarget(e),n=this.getDescriptor(e,t,r);o.descriptor=n,this._renderer.pipeline.setRenderTarget(o),this._renderer.encoder.beginRenderPass(o),this._renderer.encoder.setViewport(s)}finishRenderPass(){this._renderer.encoder.endRenderPass()}_getGpuColorTexture(e){let t=this._renderTargetSystem.getGpuRenderTarget(e);return t.contexts[0]?t.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,t,r){typeof t=="boolean"&&(t=t?b.ALL:b.NONE);let s=this._renderTargetSystem,i=s.getGpuRenderTarget(e),o=e.colorTextures.map((c,f)=>{let h=i.contexts[f],l,p;h?l=h.getCurrentTexture().createView():l=this._renderer.texture.getGpuSource(c).createView({mipLevelCount:1}),i.msaaTextures[f]&&(p=l,l=this._renderer.texture.getTextureView(i.msaaTextures[f]));let m=t&b.COLOR?"clear":"load";return r??(r=s.defaultClearColor),{view:l,resolveTarget:p,clearValue:r,storeOp:"store",loadOp:m}}),n;if((e.stencil||e.depth)&&!e.depthStencilTexture&&(e.ensureDepthStencilTexture(),e.depthStencilTexture.source.sampleCount=i.msaa?4:1),e.depthStencilTexture){let c=t&b.STENCIL?"clear":"load",f=t&b.DEPTH?"clear":"load";n={view:this._renderer.texture.getGpuSource(e.depthStencilTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:c,depthClearValue:1,depthLoadOp:f,depthStoreOp:"store"}}return{colorAttachments:o,depthStencilAttachment:n}}clear(e,t=!0,r,s){if(!t)return;let{gpu:i,encoder:o}=this._renderer,n=i.device;if(o.commandEncoder===null){let c=n.createCommandEncoder(),f=this.getDescriptor(e,t,r),h=c.beginRenderPass(f);h.setViewport(s.x,s.y,s.width,s.height,0,1),h.end();let l=c.finish();n.queue.submit([l])}else this.startRenderPass(e,t,r,s)}initGpuRenderTarget(e){e.isRoot=!0;let t=new J;return e.colorTextures.forEach((r,s)=>{if(de.test(r.resource)){let i=r.resource.getContext("webgpu"),o=r.transparent?"premultiplied":"opaque";try{i.configure({device:this._renderer.gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:o})}catch(n){console.error(n)}t.contexts[s]=i}if(t.msaa=r.source.antialias,r.source.antialias){let i=new ce({width:0,height:0,sampleCount:4});t.msaaTextures[s]=i}}),t.msaa&&(t.msaaSamples=4,e.depthStencilTexture&&(e.depthStencilTexture.source.sampleCount=4)),t}destroyGpuRenderTarget(e){e.contexts.forEach(t=>{t.unconfigure()}),e.msaaTextures.forEach(t=>{t.destroy()}),e.msaaTextures.length=0,e.contexts.length=0}ensureDepthStencilTexture(e){let t=this._renderTargetSystem.getGpuRenderTarget(e);e.depthStencilTexture&&t.msaa&&(e.depthStencilTexture.source.sampleCount=4)}resizeGpuRenderTarget(e){let t=this._renderTargetSystem.getGpuRenderTarget(e);t.width=e.width,t.height=e.height,t.msaa&&e.colorTextures.forEach((r,s)=>{t.msaaTextures[s]?.resize(r.source.width,r.source.height,r.source._resolution)})}};var k=class extends Me{constructor(e){super(e),this.adaptor=new Q,this.adaptor.init(e,this)}};k.extension={type:[d.WebGPUSystem],name:"renderTarget"};var H=class{constructor(){this._gpuProgramData=Object.create(null)}contextChange(e){this._gpu=e,this.maxTextures=e.device.limits.maxSampledTexturesPerShaderStage}getProgramData(e){return this._gpuProgramData[e._layoutKey]||this._createGPUProgramData(e)}_createGPUProgramData(e){let t=this._gpu.device,r=e.gpuLayout.map(i=>t.createBindGroupLayout({entries:i})),s={bindGroupLayouts:r};return this._gpuProgramData[e._layoutKey]={bindGroups:r,pipeline:t.createPipelineLayout(s)},this._gpuProgramData[e._layoutKey]}destroy(){this._gpu=null,this._gpuProgramData=null}};H.extension={type:[d.WebGPUSystem],name:"shader"};var g={};g.normal={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}};g.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}};g.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}};g.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}};g.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}};g.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}};g["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}};g["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}};g["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}};g.erase={alpha:{srcFactor:"zero",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"one-minus-src",operation:"add"}};g.min={alpha:{srcFactor:"one",dstFactor:"one",operation:"min"},color:{srcFactor:"one",dstFactor:"one",operation:"min"}};g.max={alpha:{srcFactor:"one",dstFactor:"one",operation:"max"},color:{srcFactor:"one",dstFactor:"one",operation:"max"}};var z=class{constructor(){this.defaultState=new $,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:g[e.blendMode]||g.normal}]}destroy(){this.gpu=null}};z.extension={type:[d.WebGPUSystem],name:"state"};var Le={type:"image",upload(a,e,t){let r=a.resource,s=(a.pixelWidth|0)*(a.pixelHeight|0),i=r.byteLength/s;t.device.queue.writeTexture({texture:e},r,{offset:0,rowsPerImage:a.pixelHeight,bytesPerRow:a.pixelHeight*i},{width:a.pixelWidth,height:a.pixelHeight,depthOrArrayLayers:1})}};var ae={"bc1-rgba-unorm":{blockBytes:8,blockWidth:4,blockHeight:4},"bc2-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"bc3-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"bc7-rgba-unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"etc1-rgb-unorm":{blockBytes:8,blockWidth:4,blockHeight:4},"etc2-rgba8unorm":{blockBytes:16,blockWidth:4,blockHeight:4},"astc-4x4-unorm":{blockBytes:16,blockWidth:4,blockHeight:4}},Ve={blockBytes:4,blockWidth:1,blockHeight:1},Ae={type:"compressed",upload(a,e,t){let r=a.pixelWidth,s=a.pixelHeight,i=ae[a.format]||Ve;for(let o=0;o<a.resource.length;o++){let n=a.resource[o],u=Math.ceil(r/i.blockWidth)*i.blockBytes;t.device.queue.writeTexture({texture:e,mipLevel:o},n,{offset:0,bytesPerRow:u},{width:Math.ceil(r/i.blockWidth)*i.blockWidth,height:Math.ceil(s/i.blockHeight)*i.blockHeight,depthOrArrayLayers:1}),r=Math.max(r>>1,1),s=Math.max(s>>1,1)}}};var ee={type:"image",upload(a,e,t){let r=a.resource;if(!r)return;let s=Math.min(e.width,a.resourceWidth||a.pixelWidth),i=Math.min(e.height,a.resourceHeight||a.pixelHeight),o=a.alphaMode==="premultiply-alpha-on-upload";t.device.queue.copyExternalImageToTexture({source:r},{texture:e,premultipliedAlpha:o},{width:s,height:i})}};var De={type:"video",upload(a,e,t){ee.upload(a,e,t)}};var te=class{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let t=this.pipelines[e];return t||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
                        var<private> pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
                        vec2<f32>(-1.0, -1.0), vec2<f32>(-1.0, 3.0), vec2<f32>(3.0, -1.0));

                        struct VertexOutput {
                        @builtin(position) position : vec4<f32>,
                        @location(0) texCoord : vec2<f32>,
                        };

                        @vertex
                        fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
                        var output : VertexOutput;
                        output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
                        output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
                        return output;
                        }

                        @group(0) @binding(0) var imgSampler : sampler;
                        @group(0) @binding(1) var img : texture_2d<f32>;

                        @fragment
                        fn fragmentMain(@location(0) texCoord : vec2<f32>) -> @location(0) vec4<f32> {
                        return textureSample(img, imgSampler, texCoord);
                        }
                    `})),t=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=t),t}generateMipmap(e){let t=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let r=e,s=e.depthOrArrayLayers||1,i=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!i){let u={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:s},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};r=this.device.createTexture(u)}let o=this.device.createCommandEncoder({}),n=t.getBindGroupLayout(0);for(let u=0;u<s;++u){let c=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:u,arrayLayerCount:1}),f=i?1:0;for(let h=1;h<e.mipLevelCount;++h){let l=r.createView({baseMipLevel:f++,mipLevelCount:1,dimension:"2d",baseArrayLayer:u,arrayLayerCount:1}),p=o.beginRenderPass({colorAttachments:[{view:l,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),m=this.device.createBindGroup({layout:n,entries:[{binding:0,resource:this.sampler},{binding:1,resource:c}]});p.setPipeline(t),p.setBindGroup(0,m),p.draw(3,1,0,0),p.end(),c=l}}if(!i){let u={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:s};for(let c=1;c<e.mipLevelCount;++c)o.copyTextureToTexture({texture:r,mipLevel:c-1},{texture:e,mipLevel:c},u),u.width=Math.ceil(u.width/2),u.height=Math.ceil(u.height/2)}return this.device.queue.submit([o.finish()]),i||r.destroy(),e}};var F=class{constructor(e){this.managedTextures=[],this._gpuSources=Object.create(null),this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._textureViewHash=Object.create(null),this._uploads={image:ee,buffer:Le,video:De,compressed:Ae},this._renderer=e,e.renderableGC.addManagedHash(this,"_gpuSources"),e.renderableGC.addManagedHash(this,"_gpuSamplers"),e.renderableGC.addManagedHash(this,"_bindGroupHash"),e.renderableGC.addManagedHash(this,"_textureViewHash")}contextChange(e){this._gpu=e}initSource(e){if(e.autoGenerateMipmaps){let u=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(u))+1}let t=GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST;e.uploadMethodId!=="compressed"&&(t|=GPUTextureUsage.RENDER_ATTACHMENT,t|=GPUTextureUsage.COPY_SRC);let r=ae[e.format]||{blockBytes:4,blockWidth:1,blockHeight:1},s=Math.ceil(e.pixelWidth/r.blockWidth)*r.blockWidth,i=Math.ceil(e.pixelHeight/r.blockHeight)*r.blockHeight,o={label:e.label,size:{width:s,height:i},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:t},n=this._gpu.device.createTexture(o);return this._gpuSources[e.uid]=n,this.managedTextures.includes(e)||(e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),e.on("updateMipmaps",this.onUpdateMipmaps,this),this.managedTextures.push(e)),this.onSourceUpdate(e),n}onSourceUpdate(e){let t=this.getGpuSource(e);t&&(this._uploads[e.uploadMethodId]&&this._uploads[e.uploadMethodId].upload(e,t,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&this.onUpdateMipmaps(e))}onSourceUnload(e){let t=this._gpuSources[e.uid];t&&(this._gpuSources[e.uid]=null,t.destroy())}onUpdateMipmaps(e){this._mipmapGenerator||(this._mipmapGenerator=new te(this._gpu.device));let t=this.getGpuSource(e);this._mipmapGenerator.generateMipmap(t)}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this),e.off("updateMipmaps",this.onUpdateMipmaps,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}onSourceResize(e){let t=this._gpuSources[e.uid];t?(t.width!==e.pixelWidth||t.height!==e.pixelHeight)&&(this._textureViewHash[e.uid]=null,this._bindGroupHash[e.uid]=null,this.onSourceUnload(e),this.initSource(e)):this.initSource(e)}_initSampler(e){return this._gpuSamplers[e._resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e._resourceId]}getGpuSampler(e){return this._gpuSamplers[e._resourceId]||this._initSampler(e)}getGpuSource(e){return this._gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){return this._bindGroupHash[e.uid]??this._createTextureBindGroup(e)}_createTextureBindGroup(e){let t=e.source;return this._bindGroupHash[e.uid]=new W({0:t,1:t.style,2:new q({uTextureMatrix:{type:"mat3x3<f32>",value:e.textureMatrix.mapCoord}})}),this._bindGroupHash[e.uid]}getTextureView(e){let t=e.source;return this._textureViewHash[t.uid]??this._createTextureView(t)}_createTextureView(e){return this._textureViewHash[e.uid]=this.getGpuSource(e).createView(),this._textureViewHash[e.uid]}generateCanvas(e){let t=this._renderer,r=t.gpu.device.createCommandEncoder(),s=B.get().createCanvas();s.width=e.source.pixelWidth,s.height=e.source.pixelHeight;let i=s.getContext("webgpu");return i.configure({device:t.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:B.get().getNavigator().gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),r.copyTextureToTexture({texture:t.texture.getGpuSource(e.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:s.width,height:s.height}),t.gpu.device.queue.submit([r.finish()]),s}getPixels(e){let t=this.generateCanvas(e),r=ne.getOptimalCanvasAndContext(t.width,t.height),s=r.context;s.drawImage(t,0,0);let{width:i,height:o}=t,n=s.getImageData(0,0,i,o),u=new Uint8ClampedArray(n.data.buffer);return ne.returnCanvasAndContext(r),{pixels:u,width:i,height:o}}destroy(){this.managedTextures.slice().forEach(e=>this.onSourceDestroy(e)),this.managedTextures=null;for(let e of Object.keys(this._bindGroupHash)){let t=Number(e);this._bindGroupHash[t]?.destroy(),this._bindGroupHash[t]=null}this._gpu=null,this._mipmapGenerator=null,this._gpuSources=null,this._bindGroupHash=null,this._textureViewHash=null,this._gpuSamplers=null}};F.extension={type:[d.WebGPUSystem],name:"texture"};var Ne=[...Ge,L,E,x,U,F,k,H,z,D,M,w,v],je=[...Be,A],Ke=[C,T,S],He=[],ze=[],Fe=[];G.handleByNamedList(d.WebGPUSystem,He);G.handleByNamedList(d.WebGPUPipes,ze);G.handleByNamedList(d.WebGPUPipesAdaptor,Fe);G.add(...Ne,...je,...Ke);var ke=class extends xe{constructor(){let e={name:"webgpu",type:ge.WEBGPU,systems:He,renderPipes:ze,renderPipeAdaptors:Fe};super(e)}};export{ke as a};