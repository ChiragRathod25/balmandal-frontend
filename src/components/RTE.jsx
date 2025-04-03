import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Controller } from 'react-hook-form';
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Base64UploadAdapter,
  Code,
  CodeBlock,
  Clipboard,
  Emoji,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SimpleUploadAdapter,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  WordCount,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './RTE.css';
import config from '../conf/config';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

function RTE({ control, name, label, defaultValue = '' }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const editorMenuBarRef = useRef(null);

  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        initialData: defaultValue,
        toolbar: {
          items: [
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'bulletedList',
            'numberedList',
            'alignment',
            '|',
            'insertImage',
            'insertImageViaUrl',
            'mediaEmbed',
            'insertTable',
            'highlight',
            'link',
            '|',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            'removeFormat',
            '|',
            'emoji',
            'specialCharacters',
            'horizontalLine',

            'blockQuote',
            'codeBlock',
            'htmlEmbed',
            '|',

            'todoList',
            'outdent',
            'indent',
          ],
          shouldNotGroupWhenFull: false,
        },

        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Base64UploadAdapter,
          Bold,
          Code,
          CodeBlock,
          Clipboard,
          Emoji,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Mention,
          Paragraph,
          PasteFromOffice,
          RemoveFormat,
          SimpleUploadAdapter,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
          WordCount,
        ],
        balloonToolbar: [
          'fontSize',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'alignment',
          'bulletedList',
          'numberedList',
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [
            10,
            12,
            14,
            'default',
            18,
            20,
            22,
            24,
            26,
            28,
            30,
            32,
            36,
            40,
            44,
            48,
            56,
            64,
            72,
          ],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
              view: 'p',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5',
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6',
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
          ],
          upload:{
            types:['png','jpeg','jpg','gif','bmp','webp'],

          }
        },
        simpleUpload: {
          uploadUrl:config.uploadFileUrl,
          // withCredentials: true,
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        },
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file',
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        mention: {
          feeds: [
            {
              marker: '@',
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ],
            },
          ],
        },
        menuBar: {
          isVisible: true,
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
    
         
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-word-count"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {/* <label htmlFor={name}>{label}</label> */}
            {editorConfig && control && (
              <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange } }) => (
                  <CKEditor
                    onReady={(editor) => {
                      const wordCount = editor.plugins.get('WordCount');
                      editorWordCountRef.current.appendChild(wordCount.wordCountContainer);

                      editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element);


                    }}
                    onChange={(event, editor) => {
                      // editor.model.document.on('change:data', () => {
                      //   const data = editor.getData();
                      //   onChange(data); // This updates the form value
                      // });

                      const data = editor.getData();
                      onChange(data);
                    }}
                    onAfterDestroy={() => {
                      Array.from(editorWordCountRef?.current.children).forEach((child) =>
                        child.remove()
                      );

                      Array.from(editorMenuBarRef.current.children).forEach((child) =>
                        child.remove()
                      );
                    }}
                    editor={ClassicEditor}
                    config={editorConfig}
                  />
                )}
              />
            )}
          </div>
        </div>
        <div className="editor_container__word-count" ref={editorWordCountRef}></div>
      </div>
    </div>
  );
}

export default RTE;
