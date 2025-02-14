/**
Design used from:
https://github.com/SpeedCodeProjects/cassette-animation/blob/main/index.html
**/
import { Component, createEffect, Show } from "solid-js";
import "/app/app/assets/stylesheets/cassette.css";

const CassetteTape: Component<{
    name: string;
    thumbnail: string;
    playing: boolean;
    onclick?: () => void
}> = (props) => {
  const { thumbnail, name, onclick } = props;
  createEffect(() => {

  })
  const handleClick = () => {
    if (onclick !== undefined) {
        onclick()
    }
  }
  return (
    <div class="cursor-pointer" onclick={handleClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 513.5" class="w-[550px]">
        <g id="Tape">
          <g id={props.playing ? 'Tape1' : ''}>
            <g id="TapeReel">
              <circle cx="234" cy="234" r="160" fill="#1a1a1a">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  from="160"
                  to="85"
                />
              </circle>
              <circle cx="234" cy="234" r="140" stroke="#333" fill="none">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  from="140"
                  to="65"
                />
              </circle>
              <circle cx="234" cy="234" r="120" stroke="#333" fill="none">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  from="120"
                  to="45"
                />
              </circle>
              <circle cx="234" cy="234" r="100" stroke="#333" fill="none">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  from="100"
                  to="25"
                />
              </circle>
            </g>

            <circle cx="234" cy="234" r="86.05" fill="#f2f2f2" />
            <circle cx="234" cy="234" r="40.49" fill="#bfbfbf" />
            <rect
              x="246.52"
              y="198.18"
              width="10.12"
              height="10.12"
              transform="translate(133.98 -98.04) rotate(29.74)"
              fill="#f2f2f2"
            />
            <rect
              x="211.36"
              y="259.7"
              width="10.12"
              height="10.12"
              transform="translate(159.87 -72.49) rotate(29.74)"
              fill="#f2f2f2"
            />
            <rect
              x="264.37"
              y="228.74"
              width="10.12"
              height="10.12"
              transform="translate(501.7 -36.95) rotate(89.68)"
              fill="#f2f2f2"
            />
            <rect
              x="193.51"
              y="229.14"
              width="10.12"
              height="10.12"
              transform="translate(431.64 34.31) rotate(89.68)"
              fill="#f2f2f2"
            />
            <rect
              x="210.95"
              y="198.41"
              width="10.12"
              height="10.12"
              transform="translate(-73.39 137.84) rotate(-30.51)"
              fill="#f2f2f2"
            />
            <rect
              x="246.93"
              y="259.46"
              width="10.12"
              height="10.12"
              transform="translate(-99.41 164.56) rotate(-30.51)"
              fill="#f2f2f2"
            />
            <circle cx="234" cy="234" r="24.18" fill="#1a1a1a" />
            <polygon
              points="234 198.38 203.15 251.81 264.85 251.81 234 198.38"
              fill="#1a1a1a"
            />
            <line
              x1="234"
              y1="198.38"
              x2="234"
              y2="234"
              fill="none"
              stroke="#f2f2f2"
              stroke-miterlimit="10"
            />
            <line
              x1="203.15"
              y1="251.81"
              x2="234"
              y2="234"
              fill="none"
              stroke="#f2f2f2"
              stroke-miterlimit="10"
            />
            <line
              x1="264.85"
              y1="251.81"
              x2="234"
              y2="234"
              fill="none"
              stroke="#f2f2f2"
              stroke-miterlimit="10"
            />
          </g>
          <g id={props.playing ? 'Tape2' : ''}>
            <g id="TapeReel">
              <circle cx="576" cy="234" r="161.97" fill="#1a1a1a">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  to="160"
                  from="85"
                />
              </circle>
              <circle cx="576" cy="234" r="140" stroke="#333" fill="none">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  to="140"
                  from="65"
                />
              </circle>
              <circle cx="576" cy="234" r="120" stroke="#333" fill="none">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  to="120"
                  from="45"
                />
              </circle>
              <circle cx="576" cy="234" r="100" stroke="#333" fill="none">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="15s"
                  repeatCount="indefinite"
                  to="100"
                  from="25"
                />
              </circle>
            </g>
            <circle cx="576" cy="234" r="86.05" fill="#f2f2f2" />
            <circle cx="576" cy="234" r="40.49" fill="#bfbfbf" />
            <rect
              x="588.52"
              y="198.18"
              width="10.12"
              height="10.12"
              transform="translate(179.04 -267.72) rotate(29.74)"
              fill="#f2f2f2"
            />
            <rect
              x="553.36"
              y="259.7"
              width="10.12"
              height="10.12"
              transform="translate(204.94 -242.17) rotate(29.74)"
              fill="#f2f2f2"
            />
            <rect
              x="606.37"
              y="228.74"
              width="10.12"
              height="10.12"
              transform="translate(841.77 -378.94) rotate(89.68)"
              fill="#f2f2f2"
            />
            <rect
              x="535.51"
              y="229.14"
              width="10.12"
              height="10.12"
              transform="translate(771.71 -307.68) rotate(89.68)"
              fill="#f2f2f2"
            />
            <rect
              x="552.95"
              y="198.41"
              width="10.12"
              height="10.12"
              transform="translate(-26.04 311.47) rotate(-30.51)"
              fill="#f2f2f2"
            />
            <rect
              x="588.93"
              y="259.46"
              width="10.12"
              height="10.12"
              transform="translate(-52.05 338.19) rotate(-30.51)"
              fill="#f2f2f2"
            />
            <circle cx="576" cy="234" r="24.18" fill="#1a1a1a" />
            <polygon
              points="576 198.38 545.15 251.81 606.85 251.81 576 198.38"
              fill="#1a1a1a"
            />
            <line
              x1="576"
              y1="198.38"
              x2="576"
              y2="234"
              fill="none"
              stroke="#f2f2f2"
              stroke-miterlimit="10"
            />
            <line
              x1="545.15"
              y1="251.81"
              x2="576"
              y2="234"
              fill="none"
              stroke="#f2f2f2"
              stroke-miterlimit="10"
            />
            <line
              x1="606.85"
              y1="251.81"
              x2="576"
              y2="234"
              fill="none"
              stroke="#f2f2f2"
              stroke-miterlimit="10"
            />
          </g>
        </g>
        <g id="Cassette">
          <path
            d="M780.41,0H29.59A20.59,20.59,0,0,0,9,20.59V483.41A20.59,20.59,0,0,0,29.59,504H780.41A20.59,20.59,0,0,0,801,483.41V20.59A20.59,20.59,0,0,0,780.41,0ZM297,189H513v90H297ZM220.5,486A13.5,13.5,0,1,1,234,472.5,13.49,13.49,0,0,1,220.5,486ZM234,279a45,45,0,1,1,45-45A45,45,0,0,1,234,279Zm58.5,198A13.5,13.5,0,1,1,306,463.5,13.49,13.49,0,0,1,292.5,477Zm225,0A13.5,13.5,0,1,1,531,463.5,13.49,13.49,0,0,1,517.5,477Zm72,9A13.5,13.5,0,1,1,603,472.5,13.49,13.49,0,0,1,589.5,486ZM576,279a45,45,0,1,1,45-45A45,45,0,0,1,576,279Z"
            fill="#262626"
          />
          <path
            d="M654.47,501.21,631.65,394.7a9.74,9.74,0,0,0-9.53-7.7H187.88a9.74,9.74,0,0,0-9.53,7.7L155.53,501.21A9.74,9.74,0,0,0,165.06,513H644.94A9.74,9.74,0,0,0,654.47,501.21ZM220.5,486A13.5,13.5,0,1,1,234,472.5,13.49,13.49,0,0,1,220.5,486Zm72-9A13.5,13.5,0,1,1,306,463.5,13.49,13.49,0,0,1,292.5,477Zm225,0A13.5,13.5,0,1,1,531,463.5,13.49,13.49,0,0,1,517.5,477Zm72,9A13.5,13.5,0,1,1,603,472.5,13.49,13.49,0,0,1,589.5,486Z"
            fill="#262626"
            stroke="#bfbfbf"
            stroke-miterlimit="10"
          />
          <rect
            x="297"
            y="189"
            width="216"
            height="90"
            fill="#262626"
            opacity="0.67"
          />
          <rect y="288" width="18" height="144" rx="3.98" fill="#262626" />
          <rect
            x="792"
            y="288"
            width="18"
            height="144"
            rx="3.98"
            fill="#262626"
          />
        </g>
        <g id="Label">
          <path d="M45,36V369H765V36ZM648,297H162V171H648Z" fill="#bfbfbf" />
          <rect x="45" y="36" width="720" height="27" class="fill-primary" />
          <rect x="45" y="63" width="720" height="81" fill="#f2f2f2" />
          <rect x="45" y="315" width="720" height="54" fill="#1a1a1a" />
          <line
            x1="45"
            y1="171"
            x2="162"
            y2="171"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="180"
            x2="162"
            y2="180"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="189"
            x2="162"
            y2="189"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="198"
            x2="162"
            y2="198"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="207"
            x2="162"
            y2="207"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="216"
            x2="162"
            y2="216"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="225"
            x2="162"
            y2="225"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="234"
            x2="162"
            y2="234"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="243"
            x2="162"
            y2="243"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="252"
            x2="162"
            y2="252"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="261"
            x2="162"
            y2="261"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="270"
            x2="162"
            y2="270"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="279"
            x2="162"
            y2="279"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="288"
            x2="162"
            y2="288"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="45"
            y1="297"
            x2="162"
            y2="297"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="171"
            x2="765"
            y2="171"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="180"
            x2="765"
            y2="180"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="189"
            x2="765"
            y2="189"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="198"
            x2="765"
            y2="198"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="207"
            x2="765"
            y2="207"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="216"
            x2="765"
            y2="216"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="225"
            x2="765"
            y2="225"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="234"
            x2="765"
            y2="234"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="243"
            x2="765"
            y2="243"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="252"
            x2="765"
            y2="252"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="261"
            x2="765"
            y2="261"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="270"
            x2="765"
            y2="270"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="279"
            x2="765"
            y2="279"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="288"
            x2="765"
            y2="288"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          <line
            x1="648"
            y1="297"
            x2="765"
            y2="297"
            fill="none"
            stroke="#f2f2f2"
            stroke-miterlimit="10"
          />
          {/* Textstart */}
          <text x="55" y="130" class="font-bold text-6xl select-none">{name}</text>
          {/* textend */}
          <path
            d="M559.08,72.89h2.11l2.38,4.55.91,2h0c-.09-1-.26-2.24-.26-3.32V72.89h2V82h-2.12l-2.38-4.55-.9-2h-.06c.1,1,.26,2.23.26,3.3V82h-2Z"
          />
          <path
            d="M568.17,80.9a1.25,1.25,0,1,1,1.24,1.29A1.24,1.24,0,0,1,568.17,80.9Z"
          />
          <path
            d="M572.59,72.89h3.29c1.93,0,3.52.68,3.52,2.85s-1.59,3-3.52,3h-1.23V82h-2.06Zm3.12,4.21c1.08,0,1.67-.46,1.67-1.36s-.59-1.21-1.67-1.21h-1.06V77.1Zm-.21,1.09,1.43-1.32L579.84,82h-2.31Z"
          />
          <path
            d="M581,80.9a1.25,1.25,0,1,1,1.24,1.29A1.24,1.24,0,0,1,581,80.9Z"
          />
          <path d="M585.51,72.11h3V73.2H587v9.86h1.43v1.09h-3Z" />
          <path d="M630.64,83.06h1.43V73.2h-1.43V72.11h3v12h-3Z" />
          <path d="M639.37,82V73.27h7V82Zm.21-.21h6.57V73.49h-6.57Z" />
          <path d="M649.37,72.83h1.17V82h-1.17Z" />
          <path
            d="M653.05,72.83h1.21l3.33,5.78,1,1.9h.06c-.06-.92-.15-2-.15-2.92V72.83h1.11V82h-1.21l-3.33-5.78-1-1.9H654c.05.93.14,1.91.14,2.87V82h-1.11Z"
          />
          <path d="M665.4,82V73.27h7V82Zm.22-.21h6.57V73.49h-6.57Z" />
          <path
            d="M674.88,77.39c0-2.94,1.62-4.73,3.93-4.73s3.93,1.79,3.93,4.73-1.62,4.8-3.93,4.8S674.88,80.34,674.88,77.39Zm6.65,0c0-2.29-1.08-3.7-2.72-3.7s-2.72,1.41-2.72,3.7,1.08,3.77,2.72,3.77S681.53,79.68,681.53,77.39Z"
          />
          <path
            d="M684.67,78.23v-5.4h1.17v5.43c0,2.21.93,2.9,2.13,2.9s2.18-.69,2.18-2.9V72.83h1.12v5.4c0,3-1.42,4-3.3,4S684.67,81.18,684.67,78.23Z"
          />
          <path d="M695.65,73.82h-2.78v-1h6.73v1h-2.78V82h-1.17Z" />
          {/* <rect x="54" y="90" width="45" height="45" fill="#262626" />
          <path
            d="M69.23,100h7c4.81,0,8.13,1.64,8.13,5.79a5.19,5.19,0,0,1-3.45,5.13v.14a5.45,5.45,0,0,1,4.8,5.66c0,4.64-3.67,6.91-8.94,6.91H69.23Zm6.5,10.06c4,0,5.68-1.49,5.68-3.88,0-2.76-1.89-3.79-5.54-3.79H72.23v7.67Zm.62,11.18c4,0,6.42-1.45,6.42-4.64,0-2.91-2.29-4.24-6.42-4.24H72.23v8.88Z"
            fill="#f2f2f2"
          /> */}
          <path
            d="M385.13,331.42h1.21l3.33,5.78,1,1.91h.06c-.06-.93-.15-2-.15-2.93v-4.76h1.11v9.2h-1.21l-3.33-5.79-1-1.9h0c0,.93.14,1.91.14,2.87v4.82h-1.11Z"
            fill="#f2f2f2"
          />
          <path
            d="M393.58,337.22c0-2.27,1.48-3.58,3.15-3.58a3.6,3.6,0,1,1-3.15,3.58Zm5.12,0c0-1.56-.8-2.62-2-2.62s-2,1.06-2,2.62.79,2.6,2,2.6S398.7,338.78,398.7,337.22Z"
            fill="#f2f2f2"
          />
          <path
            d="M401.67,333.81h.95l.1,1.24h0a2.33,2.33,0,0,1,1.93-1.41,1.59,1.59,0,0,1,.73.14l-.21,1a2,2,0,0,0-.66-.11c-.58,0-1.27.41-1.73,1.56v4.38h-1.15Z"
            fill="#f2f2f2"
          />
          <path
            d="M406.53,333.81h1l.1,1h0a3,3,0,0,1,2.11-1.15,1.79,1.79,0,0,1,1.88,1.3,3.21,3.21,0,0,1,2.25-1.3c1.4,0,2.07.92,2.07,2.66v4.32h-1.15v-4.17c0-1.27-.4-1.81-1.27-1.81a2.45,2.45,0,0,0-1.7,1.05v4.93h-1.16v-4.17c0-1.27-.4-1.81-1.26-1.81a2.51,2.51,0,0,0-1.71,1.05v4.93h-1.15Z"
            fill="#f2f2f2"
          />
          <path
            d="M417.71,338.85c0-1.49,1.28-2.23,4.18-2.54,0-.88-.29-1.72-1.4-1.72a3.71,3.71,0,0,0-2,.73l-.45-.79a5,5,0,0,1,2.67-.89c1.66,0,2.37,1.1,2.37,2.8v4.18h-.95l-.1-.82h0a3.62,3.62,0,0,1-2.25,1A1.85,1.85,0,0,1,417.71,338.85Zm4.18.1v-1.89c-2.28.28-3.05.84-3.05,1.71a1,1,0,0,0,1.19,1.09A2.75,2.75,0,0,0,421.89,339Z"
            fill="#f2f2f2"
          />
          <path
            d="M425.19,339.25v-8.61h1.15v8.69c0,.35.16.49.32.49l.26,0,.15.88a1.83,1.83,0,0,1-.66.1C425.55,340.78,425.19,340.23,425.19,339.25Z"
            fill="#f2f2f2"
          />
          <path
            d="M431.67,331.42h2.73c1.87,0,3.16.64,3.16,2.25a2,2,0,0,1-1.34,2v.06a2.12,2.12,0,0,1,1.87,2.2c0,1.8-1.43,2.69-3.48,2.69h-2.94Zm2.53,3.91c1.56,0,2.21-.57,2.21-1.5s-.74-1.48-2.16-1.48h-1.41v3Zm.24,4.36c1.57,0,2.5-.57,2.5-1.81s-.89-1.65-2.5-1.65h-1.6v3.46Z"
            fill="#f2f2f2"
          />
          <path
            d="M439.58,331.66a.74.74,0,0,1,.8-.74.73.73,0,0,1,.79.74.75.75,0,0,1-.79.75A.76.76,0,0,1,439.58,331.66Zm.21,2.15h1.15v6.81h-1.15Z"
            fill="#f2f2f2"
          />
          <path
            d="M442.81,338.85c0-1.49,1.28-2.23,4.19-2.54,0-.88-.3-1.72-1.41-1.72a3.71,3.71,0,0,0-2,.73l-.45-.79a5,5,0,0,1,2.67-.89c1.67,0,2.37,1.1,2.37,2.8v4.18h-.95l-.1-.82h0a3.62,3.62,0,0,1-2.25,1A1.85,1.85,0,0,1,442.81,338.85Zm4.19.1v-1.89c-2.29.28-3.06.84-3.06,1.71s.53,1.09,1.2,1.09A2.79,2.79,0,0,0,447,339Z"
            fill="#f2f2f2"
          />
          <path
            d="M449.54,339.84l.57-.76a3,3,0,0,0,2,.81c.89,0,1.33-.48,1.33-1.06s-.8-1-1.55-1.29c-1-.35-2-.82-2-2s.87-1.93,2.34-1.93a3.51,3.51,0,0,1,2.12.76l-.55.74a2.6,2.6,0,0,0-1.55-.6c-.86,0-1.26.45-1.26,1s.74.9,1.52,1.18c1,.37,2.07.77,2.07,2.07,0,1.1-.88,2-2.48,2A4.11,4.11,0,0,1,449.54,339.84Z"
            fill="#f2f2f2"
          />
          <path
            d="M458.91,339.66h2v-6.58h-1.63v-.74a5.54,5.54,0,0,0,1.9-.66h.88v8H464v1h-5Z"
            fill="#f2f2f2"
          />
          <path
            d="M465.32,339.93c2.69-2.67,4.21-4.28,4.21-5.73a1.58,1.58,0,0,0-1.7-1.75,2.64,2.64,0,0,0-1.9,1.07l-.66-.65a3.5,3.5,0,0,1,2.71-1.36,2.49,2.49,0,0,1,2.68,2.63c0,1.68-1.54,3.35-3.65,5.56.48,0,1-.07,1.5-.07h2.59v1h-5.78Z"
            fill="#f2f2f2"
          />
          <path
            d="M472.34,336.12c0-3,1.08-4.61,2.87-4.61s2.86,1.62,2.86,4.61-1.08,4.66-2.86,4.66S472.34,339.11,472.34,336.12Zm4.61,0c0-2.62-.71-3.68-1.74-3.68s-1.75,1.06-1.75,3.68.71,3.74,1.75,3.74S477,338.73,477,336.12Z"
            fill="#f2f2f2"
          />
          <path
            d="M479.83,333.81H481V338c0,1.2.37,1.81,1.25,1.81.62,0,1.17-.2,1.81-1.32v-4.65h1.16c0,1.84-.08,3.83-.08,5.47,0,.39.2.54.49.54a1.18,1.18,0,0,0,.42-.08l.15.88a1.88,1.88,0,0,1-.82.16c-.77,0-1.14-.41-1.22-1.32h0a2.16,2.16,0,0,1-1.88,1.29,1.33,1.33,0,0,1-1.32-.65c0,1.34,0,1.95.09,3h-1.16Z"
            fill="#f2f2f2"
          />
          <path
            d="M486.94,339.84l.57-.76a3.07,3.07,0,0,0,2,.81c.9,0,1.34-.48,1.34-1.06s-.8-1-1.56-1.29c-.95-.35-2-.82-2-2s.88-1.93,2.35-1.93a3.51,3.51,0,0,1,2.12.76l-.55.74a2.6,2.6,0,0,0-1.55-.6c-.86,0-1.26.45-1.26,1s.74.9,1.51,1.18c1,.37,2.08.77,2.08,2.07,0,1.1-.88,2-2.48,2A4.14,4.14,0,0,1,486.94,339.84Z"
            fill="#f2f2f2"
          />
          <path
            d="M493.67,331.42H499v1h-4.13v2.88h3.49v1h-3.49v3.35h4.27v1h-5.44Z"
            fill="#f2f2f2"
          />
          <path
            d="M500.52,336c0-2.95,1.62-4.74,3.93-4.74s3.93,1.8,3.93,4.74-1.62,4.79-3.93,4.79S500.52,338.93,500.52,336Zm6.65,0c0-2.29-1.08-3.71-2.72-3.71s-2.72,1.42-2.72,3.71,1.08,3.82,2.72,3.82S507.17,338.33,507.17,336Zm-3.36,4.59,1.22-.09a2.35,2.35,0,0,0,2.35,1.46,3.45,3.45,0,0,0,1-.14l.22.91a3.78,3.78,0,0,1-1.31.21A3.53,3.53,0,0,1,503.81,340.58Z"
            fill="#f2f2f2"
          />
          <rect x="531" y="297" width="104" height="72" class="fill-primary" />
          <path
            d="M558,321.76h6.35l7.36,23.47h-5.61L563,333.34c-.65-2.34-1.28-5.12-1.9-7.56H561c-.56,2.47-1.19,5.22-1.84,7.56L556,345.23h-5.42Zm-2.51,13.75h11.29v4.13H555.47Z"
          />
          <path d="M574.28,318.23h3.44v36h-3.44Z" />
          <path
            d="M582.3,334.32c0-8.54,4.44-12.39,9.24-12.39a9.16,9.16,0,0,1,6.69,2.76l-2.8,3.16a5.13,5.13,0,0,0-3.54-1.65c-2.66,0-4.76,2-4.76,8.12,0,5.68,1.78,7.36,3.71,7.36,1.57,0,2.88-1.1,2.88-3.68,0-2.42-1.27-3.34-3-3.34a4.19,4.19,0,0,0-3.55,2.47l-.24-3.46a6.42,6.42,0,0,1,4.81-2.74c3.92,0,6.81,2.22,6.81,7.07a7.35,7.35,0,0,1-7.6,7.66C586.52,345.66,582.3,342.35,582.3,334.32Z"
          />
          <path
            d="M601.17,333.69c0-7.78,3.26-11.76,8.17-11.76s8.18,4,8.18,11.76-3.26,12-8.18,12S601.17,341.47,601.17,333.69Zm11.34,0c0-6.23-1.38-7.66-3.17-7.66s-3.17,1.43-3.17,7.66,1.39,7.87,3.17,7.87S612.51,339.93,612.51,333.69Z"
          />
          
          <Show when={thumbnail !== ""}>
            <image href={thumbnail} x="55" y="257" class="w-[100px] border-2" />
          </Show>
        </g>
      </svg>
    </div>

  );
};

export default CassetteTape;
