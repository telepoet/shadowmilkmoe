document.addEventListener('DOMContentLoaded', function () {
  loadLayoutByPetraPixel();
  SetupTips();
});

function loadLayoutByPetraPixel() {
  const mainEl = document.querySelector('main');
  if (!mainEl) return;
  mainEl.insertAdjacentHTML('beforebegin', headerHTML());
  giveActiveClassToCurrentPage();
}

const nesting = getNesting();

function headerHTML() {
  return `
  
      <!-- =============================================== -->
      <!-- HEADER -->
      <!-- =============================================== -->

      <header>

        <div class="header-content">
	        <div class="header-title"><a href="/">shadowmilk.moe</a></div>
            <div class="header-subtitle">a beast of deceit shrine and cookie run fansite</div>
	        
	        <!-- NAVIGATION -->
	        <nav>
	          <ul>
	            <li><a href="/">home</a></li>
	            <li>
	                <strong tabindex="0">the beast</strong>
	                <ul>
	                  <li><a href="/bio.html">biography</a></li>
                    <li><a href="/relationships.html">relationships</a></li>
	                  <li><a href="/speculation.html">speculation & headcanons</a></li>
	                  <li><a href="/localization.html">localization</a></li>
	                </ul>
	            </li>
                <li>
	                <strong tabindex="0">the game</strong>
	                <ul>
	                  <li><a href="/plot.html">story catch-up guide</a></li>
	                  <li><a href="/tips.html">newcomer gameplay tips</a></li>
	                </ul>
	            </li>
                <li>
	                <strong tabindex="0">extra</strong>
	                <ul>
                  	<li><a href="/fanrec.html">favorite fanworks</a></li>
	                  <li><a href="/webmaster.html">webmaster</a></li>
	                  <li><a href="/credits.html">additional credits</a></li>
	                </ul>
	            </li>
	          </ul>
	        </nav>
        	
        </div>
      </header>

      <!-- =============================================== -->
      <!-- RIGHT SIDEBAR -->
      <!-- =============================================== -->

      <aside class="right-sidebar">
        
        <div class="sidebar-section" style="text-align:center">
        <img src="./images/souljam.webp" style="width: 125px;" />
        <marquee>remember to do your guild battles!</marquee>
        <hr>
          <p>if you're cold he's cold. put him on your website:</p>
          <img src="./images/8831moe.gif"/>
          <textarea>&lt;a href="https://shadowmilk.moe/" target="_blank"&gt;
&lt;img src="https://shadowmilk.moe/images/8831moe.gif"/&gt;
&lt;/a&gt;</textarea>

        </div>
          <hr>
        <div class="sidebar-section">
              <div class="sidebar-title">to-do list</div>
            <blockquote>
              <ul>
              <li><b>image descriptions for screenreaders</b></li>
              <li>relationships page</li>
              <li>fount writeup</li>
              </ul>
            </blockquote>
            <div style="text-align:center">
              <img src="./images/sage.gif" style="width: 125px;" /><br />
              <small>oh lord he shweepin</small>
            </div>
        </div>

         </aside>
      <footer style="text-align:center">
      <small><i>Shadow Milk Cookie and CookieRun: Kingdom © Devsisters Corp.<br />This content is not affiliated, sponsored or approved by Devsisters.</i></small>
      </footer>`;
}

/* Do not edit anything below this line unless you know what you're doing. */

function giveActiveClassToCurrentPage() {
  const els = document.querySelectorAll('nav a');
  [...els].forEach((el) => {
    const href = el.getAttribute('href').replace('.html', '').replace('#', '');
    const pathname = window.location.pathname.replace('/public/', '');
    const currentHref = window.location.href.replace('.html', '') + 'END';

    /* Homepage */
    if (href == '/' || href == '/index.html') {
      if (pathname == '/') {
        el.classList.add('active');
      }
    } else {
      /* Other pages */
      if (currentHref.includes(href + 'END')) {
        el.classList.add('active');

        /* Subnavigation: */

        if (el.closest('details')) {
          el.closest('details').setAttribute('open', 'open');
          el.closest('details').classList.add('active');
        }

        if (el.closest('ul')) {
          if (el.closest('ul').closest('ul')) {
            el.closest('ul').closest('ul').classList.add('active');
          }
        }
      }
    }
  });
}

function getNesting() {
  const numberOfSlashes = window.location.pathname.split('/').length - 1;
  if (numberOfSlashes == 1) return './';
  return '../'.repeat(numberOfSlashes - 1);
}

function SetupTips() {
  let fnNumber = 0;
  let myid = '';
  let clsStart = '',
    clsEnd = '';
  let myClassList, myClass;
  let baseHide, baseFn;
  let myFn,
    i = 0,
    j = 0,
    len,
    clL;
  let fnContent;

  try {
    // Get the footnote Sections = all articles which include an id that begins with "Footnote"
    const fnotesSections = document.querySelectorAll('article[id^=Footnote]');
    let arrSections = Array.from(fnotesSections);
    for (i = 0, len = arrSections.length; i < len; i++) {
      myDiv = arrSections[i];

      // Add a hidden link to skip the section
      myDiv.insertAdjacentHTML(
        'beforebegin',
        `<a href="#End-of-${myDiv.id}"><span class="sr-only">Skip footnote section</span></a>`,
      );

      // Add the hidden div to where that link goes to
      myDiv.insertAdjacentHTML('afterend', `<div class="sr-only" id="End-of-${myDiv.id}"></div>`);
    }
  } catch (e) {
    // console.log(e + ' line: ' + e.lineNumber + ' File: ' + e.fileName);
  }

  // Now do the footnotes = all spans which include a class name that begins with "footnote"
  try {
    const fnotes = document.querySelectorAll('span[class^=footnote]');
    for (i = 0, len = fnotes.length; i < len; i++) {
      myFn = fnotes[i];
      myClassList = myFn.classList;
      for (j = 0, clL = myClassList.length; j < clL; j++) {
        myClass = myClassList[j];

        if (clsEnd !== myClass.substr(8)) {
          // Then it is a footnote of a new footnotes section
          clsEnd = myClass.substr(8); // This identifies the section it belongs to
        }

        // Now process the footnotes
        clsStart = myClass.substr(0, 8);
        if (clsStart === 'footnote') {
          // We have a footnote
          fnNumber = i + 1; // Array starts with 0; we want notes to start with 1
          myid = `Fn_${fnNumber}_${clsEnd}`; // Unique footnote reference

          myFn.id = myid; // Set the id of the footnote
          myFn.classList.add('hideTip'); // Hide the footnote in the text
          myFn.classList.add('fnWrapper'); // Add class for wrapping the tooltip
          myFn.setAttribute('role', 'presentation'); // Add ARIA attribute for accessibility

          fnContent = myFn.innerHTML; // Copy all footnote content that is inside the footnote tag

          // Add the footnote reference to the text
          // Note that the %20 in the href inserts spaces so the link appears nicely in browser status bar as "# Show Footnote 1", though there is no actual link.
          myFn.insertAdjacentHTML(
            'beforebegin',
            `<a class="fnNum" href="#Show%20Footnote%20${fnNumber} " title="Show/Hide footnote ${fnNumber} " id="${myid}a" onclick="showHide(&quot;${myid}&quot;);return false;">[<span class="sr-only">Footnote </span><span class="fnNumIn">${fnNumber}</span>]</a>`,
          );

          // Surround the footnote content with an inner div that will display as table-cell
          myFn.innerHTML = `<span hidden class="tipContent" role="note">${fnContent}</span>`;
          // Replace the above line by the line below if you want the footnote number to show in the pop-up, I prefer it not to show (but it shows in the end footnotes)
          // myFn.innerHTML = `<span hidden class="tipContent" role="note">${fnNumber}: ${fnContent}</span>`;

          try {
            // Add the footnote to the appropriate footnote section
            let FootnoteSection;
            if ((FootnoteSection = document.getElementById(`Footnotes${clsEnd}`))) {
              // insert footnote number and the footnote where the footnotes are required to appear
              FootnoteSection.innerHTML += `<p><a class="fnNumBase" href="#${myid}a" title="Footnote location">[<span class="sr-only">Location of footnote </span><span class="fnNumIn">${fnNumber}</span>]</a> <span role="note" id = "${myid}Base" class="fnTextBase">${fnContent}</span></p>`;
            }
          } catch (e) {
            // console.log(e + ' line: ' + e.lineNumber + ' File: ' + e.fileName);
          }

          myFn.classList.remove(myClass); // Remove extraneous stuff from the footnote tooltip

          // For older version, if older footnotes have not been updated - Remove the "hidden" (Footnote: and ) opening and closing tags of the footnotes in the collective section
          baseFn = document.getElementById(`${myid}Base`);
          baseHide = baseFn.getElementsByClassName('fnHide');
          while (baseHide[0]) {
            baseFn.removeChild(baseHide[0]);
          }
        }
      }
    }

    // For older version, if older footnotes have not been updated - Make the appropriate parts of the footnotes invisible except to screen readers
    let fnHides = document.getElementsByClassName('fnHide');
    [].forEach.call(fnHides, function (el) {
      el.classList.add('sr-only');
    });
  } catch (e) {
    // console.log(e + ' line: ' + e.lineNumber + ' File: ' + e.fileName);
  }
}
// ################# End of Tooltips function ######################

// ############## Function to set up showing or hiding of text #######
function showHide(divID) {
  let myDiv = document.getElementById(divID);
  try {
    if (myDiv.classList.contains('hideTip')) {
      myDiv.classList.remove('hideTip');
      myDiv.classList.add('unhideTip');
      if (divID.substr(0, 3) === 'Fn_') {
        // For if tip is a footnote replace number with an x
        document.getElementById(divID + 'a').innerHTML = '[<span class="fnNumIn">&#x2716;</span>]';
      }
    } else {
      myDiv.classList.remove('unhideTip');
      myDiv.classList.add('hideTip');
      if (divID.substr(0, 3) === 'Fn_') {
        // For if tip is a footnote, restore the reference number
        document.getElementById(divID + 'a').innerHTML =
          '[<span class="sr-only">Footnote </span><span class="fnNumIn">' +
          divID.substr(3).split('_')[0] +
          '</span>]';
      }
    }
  } catch (e) {
    // console.log(e + ' line: ' + e.lineNumber + ' File: ' + e.fileName);
  }
}
