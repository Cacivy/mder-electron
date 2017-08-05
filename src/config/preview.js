const github = `
#preview {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft Yahei", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word
}

#preview::before {
    display: table;
    content: ""
}

#preview::after {
    display: table;
    clear: both;
    content: ""
}

#preview>*:first-child {
    margin-top: 0 !important
}

#preview>*:last-child {
    margin-bottom: 0 !important
}

#preview a:not([href]) {
    color: inherit;
    text-decoration: none
}

#preview .absent {
    color: #c00
}

#preview .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1
}

#preview .anchor:focus {
    outline: none
}

#preview p,#preview blockquote,#preview ul,#preview ol,#preview dl,#preview table,#preview pre {
    margin-top: 0;
    margin-bottom: 16px
}

#preview hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e7e7e7;
    border: 0
}

#preview blockquote {
    padding: 0 1em;
    color: #777;
    border-left: 0.25em solid #ddd
}

#preview blockquote>:first-child {
    margin-top: 0
}

#preview blockquote>:last-child {
    margin-bottom: 0
}

#preview kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #555;
    vertical-align: middle;
    background-color: #fcfcfc;
    border: solid 1px #ccc;
    border-bottom-color: #bbb;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #bbb
}

#preview .loweralpha {
    list-style-type: lower-alpha
}

#preview h1,#preview h2,#preview h3,#preview h4,#preview h5,#preview h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25
}

#preview h1 .octicon-link,#preview h2 .octicon-link,#preview h3 .octicon-link,#preview h4 .octicon-link,#preview h5 .octicon-link,#preview h6 .octicon-link {
    color: #000;
    vertical-align: middle;
    visibility: hidden
}

#preview h1:hover .anchor,#preview h2:hover .anchor,#preview h3:hover .anchor,#preview h4:hover .anchor,#preview h5:hover .anchor,#preview h6:hover .anchor {
    text-decoration: none
}

#preview h1:hover .anchor .octicon-link,#preview h2:hover .anchor .octicon-link,#preview h3:hover .anchor .octicon-link,#preview h4:hover .anchor .octicon-link,#preview h5:hover .anchor .octicon-link,#preview h6:hover .anchor .octicon-link {
    visibility: visible
}

#preview h1 tt,#preview h1 code,#preview h2 tt,#preview h2 code,#preview h3 tt,#preview h3 code,#preview h4 tt,#preview h4 code,#preview h5 tt,#preview h5 code,#preview h6 tt,#preview h6 code {
    font-size: inherit
}

#preview h1 {
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid #eee
}

#preview h2 {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #eee
}

#preview h3 {
    font-size: 1.25em
}

#preview h4 {
    font-size: 1em
}

#preview h5 {
    font-size: 0.875em
}

#preview h6 {
    font-size: 0.85em;
    color: #777
}

#preview ul,#preview ol {
    padding-left: 2em
}

#preview ul.no-list,#preview ol.no-list {
    padding: 0;
    list-style-type: none
}

#preview ul ul,#preview ul ol,#preview ol ol,#preview ol ul {
    margin-top: 0;
    margin-bottom: 0
}

#preview li>p {
    margin-top: 16px
}

#preview li+li {
    margin-top: 0.25em
}

#preview dl {
    padding: 0
}

#preview dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: bold
}

#preview dl dd {
    padding: 0 16px;
    margin-bottom: 16px
}

#preview table {
    display: block;
    width: 100%;
    overflow: auto
}

#preview table th {
    font-weight: bold
}

#preview table th,#preview table td {
    padding: 6px 13px;
    border: 1px solid #ddd
}

#preview table tr {
    background-color: #fff;
    border-top: 1px solid #ccc
}

#preview table tr:nth-child(2n) {
    background-color: #f8f8f8
}

#preview img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff
}

#preview img[align=right] {
    padding-left: 20px
}

#preview img[align=left] {
    padding-right: 20px
}

#preview .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent
}

#preview span.frame {
    display: block;
    overflow: hidden
}

#preview span.frame>span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid #ddd
}

#preview span.frame span img {
    display: block;
    float: left
}

#preview span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: #333
}

#preview span.align-center {
    display: block;
    overflow: hidden;
    clear: both
}

#preview span.align-center>span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center
}

#preview span.align-center span img {
    margin: 0 auto;
    text-align: center
}

#preview span.align-right {
    display: block;
    overflow: hidden;
    clear: both
}

#preview span.align-right>span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right
}

#preview span.align-right span img {
    margin: 0;
    text-align: right
}

#preview span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden
}

#preview span.float-left span {
    margin: 13px 0 0
}

#preview span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden
}

#preview span.float-right>span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right
}

#preview code,#preview tt {
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(0,0,0,0.04);
    border-radius: 3px
}

#preview code::before,#preview code::after,#preview tt::before,#preview tt::after {
    letter-spacing: -0.2em;
    content: "\00a0"
}

#preview code br,#preview tt br {
    display: none
}

#preview del code {
    text-decoration: inherit
}

#preview pre {
    word-wrap: normal
}

#preview pre>code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0
}

#preview .highlight {
    margin-bottom: 16px
}

#preview .highlight pre {
    margin-bottom: 0;
    word-break: normal
}

#preview .highlight pre,#preview pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f7f7f7;
    border-radius: 3px
}

#preview pre code,#preview pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0
}

#preview pre code::before,#preview pre code::after,#preview pre tt::before,#preview pre tt::after {
    content: normal
}

#preview .csv-data td,#preview .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap
}

#preview .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: #fff;
    border: 0
}

#preview .csv-data tr {
    border-top: 0
}

#preview .csv-data th {
    font-weight: bold;
    background: #f8f8f8;
    border-top: 0
}
`
const vue = 
`
#preview *::selection {
    background: #42b983;
    color: #ffffff;
}


#preview table {
    display: block;
    width: 100%;
    overflow: auto;
    word-break: normal;
    word-break: keep-all;
}

#preview table tr th {
    font-weight: bold;
    padding: 6px 13px;
    border: 1px solid #ddd;
}

#preview table tr td {
    padding: 6px 13px;
    border: 1px solid #ddd;
}

#preview img {
    max-width: 100%;
}

#preview h2,
#preview h3,
#preview h4,
#preview h5,
#preview h6 {
    position: relative;
    margin: 1em 1em
}

#preview h2:before,
#preview h3:before,
#preview h4:before,
#preview h5:before,
#preview h6:before {
    content: "#";
    color: #42b983;
    position: absolute;
    left: -0.8em;
    top: -4px;
    font-size: 1.2em;
    font-weight: bold
}

#preview h4:before,
#preview h5:before,
#preview h6:before {
    content: ""
}

#preview h2,
#preview h3 {
    font-size: 22px
}

#preview h4,
#preview h5,
#preview h6 {
    font-size: 18px
}

#preview a {
    color: #42b983;
    word-break: break-all
}

#preview blockquote {
    margin: 2em 0;
    padding-left: 20px;
    border-left: 4px solid #42b983
}

#preview img {
    display: block;
    max-width: 100%;
    margin: 1em auto
}

#preview>table,
#preview>figure.highlight {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125)
}

#preview .tip {
    position: relative;
    margin: 2em 0;
    padding: 12px 24px 12px 30px;
    border-left: 4px solid #f66;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: #f8f8f8
}

#preview .tip br {
    display: none
}

#preview .tip:before {
    position: absolute;
    top: 14px;
    left: -12px;
    content: "!";
    width: 20px;
    height: 20px;
    border-radius: 100%;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #f66;
    font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
}`

export {
    github, vue
}