import { Component, createSignal, Show, Signal } from "solid-js";
import TapeInfo from "../types/TapeInfo";
import { createDropzone } from "@soorria/solid-dropzone";
import ToolTip from "./Tooltip";

const TapeInfoForm: Component<{
    tapeInfoSignal: Signal<TapeInfo>
}> = (props) => {

  const [tapeInfoForm, setTapeInfo] = props.tapeInfoSignal;
  const [imageSrc, setImageSrc] = createSignal("");

  const onDrop = (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file.type.includes('image')) {
        alert("Image type file must be uploaded")
        return;
      }
      setTapeInfo({...tapeInfoForm(), thumbnailImage: file})
      const fileReader = new FileReader()
      fileReader.onload = () => {
        console.log(fileReader.result)
        if (typeof(fileReader.result) === 'string') {
          setImageSrc(fileReader.result)
        }
      }
      fileReader.readAsDataURL(file);
    }
  const dropzone = createDropzone({ onDrop })

  return (
    <div>
      <div class="flex flex-row-reverse">
        <div class="">
          <div {...dropzone.getRootProps()} class="border-dashed border-2 rounded-lg flex items-center justify-center h-72 w-72 text-center">
            <input {...dropzone.getInputProps()} />
            <Show when={imageSrc() === ''}>
              {
                  dropzone.isDragActive ?
                  <p>Drop thumbnail here ...</p> :
                  <p>Drop thumbnail here ...</p>
              }
            </Show>
            <Show when={imageSrc()}>
              <img src={imageSrc()} class="h-full w-full object-cover rounded-lg" />
            </Show>
          </div>
        </div>
        <div class="grid gap-2 w-full">
          <div>
            <label class="label">
              <span class="label-text flex items-center gap-1">Tape Name<ToolTip text="Name for this mixtape"/></span>
            </label>
            <input onchange={(event) => setTapeInfo({...tapeInfoForm(), title: event.target.value})} type="text" placeholder="Tape Name" class="input input-bordered w-full max-w-xs input-lg" /> 
          </div>
          <div>
            <label class="label">
              <span class="label-text flex items-center gap-1">Custom URL<ToolTip text="Custom URL which can be used to access this mixtape later"/></span>
            </label>
            <input onchange={(event) => setTapeInfo({...tapeInfoForm(), customURL: event.target.value})} type="text" placeholder="Custom URL" class="input input-bordered w-full max-w-xs" />
          </div>
          <div>
            <label class="label">
              <span class="label-text flex items-center gap-1">Password<ToolTip text="Accesing this mixtape will require the entered password making it private"/></span>
            </label>
            <input onchange={(event) => setTapeInfo({...tapeInfoForm(), password: event.target.value})} type="text" placeholder="Password" class="input input-bordered w-full max-w-xs" />
          </div>
        </div>
      </div>
      <div>
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea onchange={(event) => setTapeInfo({...tapeInfoForm(), description: event.target.value})} class="textarea textarea-bordered w-full" placeholder="Description"></textarea>
        </div>
    </div>
  );
};

export default TapeInfoForm;
