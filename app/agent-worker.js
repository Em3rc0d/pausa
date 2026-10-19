/* Local generation only. No description is sent to a remote inference API. */
import './agent-planner.js?v=1.12.0';
const P=globalThis.PausaPlanner;
let pipePromise,busy=false;
async function init(){
 if(!pipePromise)pipePromise=(async()=>{
  const hf=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1');
  const {pipeline,env}=hf;
  env.useBrowserCache=true;env.allowLocalModels=false;
  // q8 WASM is the same path on browsers with and without WebGPU.
  env.backends.onnx.wasm.numThreads=1;
  return {hf,pipe:await pipeline('text-generation',P.MODEL,{revision:P.REVISION,device:'wasm',dtype:'q8'})};
 })().catch(error=>{pipePromise=null;throw error});
 return pipePromise;
}
self.onmessage=async event=>{
 const {id,data,requireChange}=event.data||{};
 if(busy||!Number.isInteger(id)||!data||!Array.isArray(data.candidates)||data.candidates.length>25||typeof data.text!=='string'||data.text.length>600)return;
 busy=true;
 try{
  const {hf,pipe}=await init();
  const options={requireChange};
  const allowed=P.counts(data,options);
  if(!allowed.length)throw Error('no-feasible-count');
  const textOf=output=>{const generated=output[0]?.generated_text;return typeof generated==='string'?generated:generated?.at(-1)?.content;};
  const countOutput=await pipe(P.countMessages(data,allowed),{max_new_tokens:20,do_sample:false,return_full_text:false,logits_processor:P.countGrammar(hf,pipe.tokenizer,allowed)});
  const count=JSON.parse(textOf(countOutput)).count;
  if(!Number.isInteger(count)||!allowed.includes(count))throw Error('invalid-count');
  const logits_processor=P.grammar(hf,pipe.tokenizer,data,{...options,exactCount:count});
  const output=await pipe(P.messages(data,count),{max_new_tokens:128,do_sample:false,return_full_text:false,logits_processor});
  postMessage({type:'result',id,count,output:textOf(output)});
 }catch(error){postMessage({type:'error',id})}finally{busy=false}
};
