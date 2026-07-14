<script lang="ts">
    import { EditorView, basicSetup } from "codemirror";
    import { javascript } from "@codemirror/lang-javascript";
    import { html } from "@codemirror/lang-html";
    import { css } from "@codemirror/lang-css";
    import {
        syntaxHighlighting,
        HighlightStyle,
        bracketMatching,
        indentOnInput,
    } from "@codemirror/language";
    import { Compartment, EditorState, type Extension } from "@codemirror/state";
    import { tags as t } from "@lezer/highlight";
    import { onMount, onDestroy } from "svelte";

    export let code: string = "";
    export let readOnly: boolean = true;
    /** "js" | "ts" | "html" | "css" — picks language for syntax highlighting. */
    export let language: "js" | "ts" | "html" | "css" = "ts";

    let editorContainer: HTMLElement;
    let view: EditorView | null = null;
    let isLight = false;
    const langCompartment = new Compartment();

    /* ═══════════════════════════════════════════════════════════
       1.  THEME — uses CSS variables so it auto-adapts to the
           playground's sidebar-theme-light / dark switch.
       ═══════════════════════════════════════════════════════════ */
    const editorTheme = EditorView.theme(
        {
            "&": {
                color: "var(--cm-fg)",
                backgroundColor: "var(--cm-bg)",
                height: "100%",
                fontSize: "12.5px",
            },
            ".cm-scroller": {
                fontFamily:
                    "var(--font-mono, 'JetBrains Mono', 'Cascadia Code', 'Consolas', monospace)",
                lineHeight: "1.68",
                paddingTop: "8px",
                paddingBottom: "18px",
            },
            ".cm-content": {
                caretColor: "var(--cm-cursor)",
                userSelect: "text",
                WebkitUserSelect: "text",
            },
            ".cm-cursor, .cm-dropCursor": {
                borderLeftColor: "var(--cm-cursor)",
                borderLeftWidth: "2px",
            },
            "&.cm-focused .cm-cursor": {
                borderLeftColor: "var(--cm-cursor)",
            },
            "&.cm-focused .cm-selectionBackground, ::selection, .cm-selectionBackground, .cm-content ::selection":
                {
                    backgroundColor: "var(--cm-selection)",
                },
            ".cm-activeLine": {
                backgroundColor: "var(--cm-active-line)",
            },
            ".cm-activeLineGutter": {
                backgroundColor: "var(--cm-active-gutter)",
                color: "var(--cm-fg)",
            },
            ".cm-gutters": {
                backgroundColor: "var(--cm-gutter-bg)",
                color: "var(--cm-gutter-fg)",
                border: "none",
                borderRight: "1px solid var(--cm-gutter-border)",
                paddingLeft: "6px",
                paddingRight: "8px",
            },
            ".cm-line": {
                padding: "0 18px",
            },
            ".cm-foldPlaceholder": {
                backgroundColor: "var(--cm-fold-bg)",
                color: "var(--cm-fold-fg)",
                border: "1px solid var(--cm-fold-border)",
                borderRadius: "4px",
                padding: "0 6px",
                margin: "0 3px",
            },
            ".cm-tooltip": {
                backgroundColor: "var(--cm-bg)",
                color: "var(--cm-fg)",
                border: "1px solid var(--cm-gutter-border)",
                borderRadius: "6px",
            },
            ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
                backgroundColor: "var(--cm-active-line)",
                color: "var(--cm-fg)",
            },
            ".cm-panels": {
                backgroundColor: "var(--cm-bg)",
                color: "var(--cm-fg)",
            },
            ".cm-searchMatch": {
                backgroundColor: "var(--cm-accent-line)",
                outline: "1px solid var(--cm-caret)",
            },
            ".cm-searchMatch.cm-searchMatch-selected": {
                backgroundColor: "var(--cm-selection)",
            },
        },
        { dark: false },
    );

    /* ═══════════════════════════════════════════════════════════
       2.  HIGHLIGHT STYLE — token colors reference CSS variables
           so the highlight follows light/dark automatically.
       ═══════════════════════════════════════════════════════════ */
    const highlightStyle = HighlightStyle.define([
        // ── JS/TS keywords (control flow) ──
        { tag: t.controlKeyword, color: "var(--cm-control)", fontWeight: "600" },
        { tag: t.operatorKeyword, color: "var(--cm-control)" },
        { tag: t.definitionKeyword, color: "var(--cm-keyword)", fontWeight: "600" },
        { tag: t.moduleKeyword, color: "var(--cm-keyword)" },
        { tag: t.modifier, color: "var(--cm-keyword)" },
        { tag: t.keyword, color: "var(--cm-keyword)" },
        // ── Literals ──
        { tag: t.string, color: "var(--cm-string)" },
        { tag: t.special(t.string), color: "var(--cm-string)" },
        { tag: t.number, color: "var(--cm-number)" },
        { tag: t.bool, color: "var(--cm-bool)" },
        { tag: t.null, color: "var(--cm-bool)" },
        { tag: t.atom, color: "var(--cm-bool)" },
        // ── Comments ──
        { tag: t.lineComment, color: "var(--cm-comment)", fontStyle: "italic" },
        { tag: t.blockComment, color: "var(--cm-comment)", fontStyle: "italic" },
        { tag: t.docComment, color: "var(--cm-doc)", fontStyle: "italic" },
        // ── Functions & types ──
        { tag: t.function(t.variableName), color: "var(--cm-function)" },
        { tag: t.function(t.propertyName), color: "var(--cm-function)" },
        { tag: t.macroName, color: "var(--cm-function)" },
        { tag: t.typeName, color: "var(--cm-type)" },
        { tag: t.className, color: "var(--cm-type)" },
        { tag: t.namespace, color: "var(--cm-type)" },
        // ── Variables / properties ──
        { tag: t.propertyName, color: "var(--cm-property)" },
        { tag: t.variableName, color: "var(--cm-fg)" },
        { tag: t.special(t.variableName), color: "var(--cm-fg)" },
        // ── Operators & punctuation ──
        { tag: t.operator, color: "var(--cm-operator)" },
        { tag: t.punctuation, color: "var(--cm-punct)" },
        { tag: t.bracket, color: "var(--cm-bracket)" },
        // ── Meta / decorators ──
        { tag: t.meta, color: "var(--cm-meta)" },
        { tag: t.annotation, color: "var(--cm-meta)" },
        { tag: t.attributeName, color: "var(--cm-attribute)" },
        // ── HTML / Svelte template ──
        { tag: t.tagName, color: "var(--cm-tag)" },
        { tag: t.angleBracket, color: "var(--cm-angle)" },
        { tag: t.attributeValue, color: "var(--cm-attr-value)" },
        { tag: t.contentSeparator, color: "var(--cm-punct)" },
        // ── CSS ──
        { tag: t.color, color: "var(--cm-css-value)" },
        { tag: t.url, color: "var(--cm-css-value)" },
        { tag: t.processingInstruction, color: "var(--cm-css-at)" },
        // ── Misc ──
        { tag: t.invalid, color: "var(--cm-invalid)" },
        { tag: t.emphasis, fontStyle: "italic" },
        { tag: t.strong, fontWeight: "bold" },
        { tag: t.link, color: "var(--cm-function)", textDecoration: "underline" },
        { tag: t.heading, color: "var(--cm-keyword)", fontWeight: "bold" },
    ]);

    /* ═══════════════════════════════════════════════════════════
       3.  LANGUAGE EXTENSION — picks the right parser by tab.
       ═══════════════════════════════════════════════════════════ */
    function getLanguageExtension(lang: "js" | "ts" | "html" | "css"): Extension {
        if (lang === "css") return css();
        if (lang === "html") return html();
        // default: javascript (TS flavor)
        return javascript({ typescript: true });
    }

    /* ═══════════════════════════════════════════════════════════
       4.  THEME OBSERVER — watch the root classList and recreate
           the editor if needed (CSS vars do most of the work; we
           also recompute on transition for safety).
       ═══════════════════════════════════════════════════════════ */
    function detectLightMode(): boolean {
        return document.documentElement.classList.contains("sidebar-theme-light");
    }

    function buildState(doc: string, lang: "js" | "ts" | "html" | "css"): EditorState {
        return EditorState.create({
            doc,
            extensions: [
                basicSetup,
                langCompartment.of(getLanguageExtension(lang)),
                syntaxHighlighting(highlightStyle),
                bracketMatching(),
                indentOnInput(),
                editorTheme,
                EditorView.editable.of(!readOnly),
                EditorState.readOnly.of(readOnly),
                EditorView.lineWrapping,
            ],
        });
    }

    function mount() {
        isLight = detectLightMode();
        view = new EditorView({
            state: buildState(code, language),
            parent: editorContainer,
        });
    }

    /* MutationObserver to detect theme switch — CSS vars auto-flow,
       but we may want to re-measure; this is a safety net. */
    let themeObserver: MutationObserver | null = null;
    function observeTheme() {
        if (themeObserver) themeObserver.disconnect();
        themeObserver = new MutationObserver(() => {
            const next = detectLightMode();
            if (next === isLight) return;
            isLight = next;
            // CSS variables are reactive; no reconfigure needed. But
            // re-measure keeps scrollbar / cursor in sync after the
            // background-color swap.
            view?.requestMeasure();
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
    }

    onMount(() => {
        mount();
        observeTheme();
    });

    onDestroy(() => {
        themeObserver?.disconnect();
        themeObserver = null;
        view?.destroy();
        view = null;
    });

    /* React to `code` prop changes. */
    $: if (view && code !== view.state.doc.toString()) {
        view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: code },
        });
    }

    /* React to `language` prop changes by re-configuring the lang compartment only. */
    $: if (view) {
        view.dispatch({
            effects: langCompartment.reconfigure(getLanguageExtension(language)),
        });
    }
</script>

<div
    class="editor-shell w-full h-full overflow-hidden select-text"
    class:editor-light={isLight}
    bind:this={editorContainer}
></div>

<style>
    .editor-shell {
        user-select: text;
        -webkit-user-select: text;
        background: var(--cm-bg);
    }

    /* Make sure CodeMirror inherits the user-select allowance. */
    div :global(.cm-editor) {
        height: 100%;
        user-select: text !important;
        -webkit-user-select: text !important;
    }
    div :global(.cm-editor .cm-scroller) {
        user-select: text !important;
        -webkit-user-select: text !important;
        cursor: text;
    }
    div :global(.cm-editor .cm-content),
    div :global(.cm-editor .cm-line),
    div :global(.cm-editor .cm-selectionBackground) {
        user-select: text !important;
        -webkit-user-select: text !important;
    }

    /* Subtle accent line on top of the editor (matches panel-head style). */
    div :global(.editor-shell)::before {
        content: "";
        position: absolute;
        inset: 0 0 auto 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            var(--cm-accent-line) 50%,
            transparent
        );
        pointer-events: none;
        z-index: 5;
    }
    div :global(.editor-shell) {
        position: relative;
    }

    /* Hide the gutter when the code is very short — keeps the look clean. */
    div :global(.cm-editor) {
        background: transparent;
    }

    /* Quiet down the basicSetup default line background. */
    div :global(.cm-editor.cm-focused) {
        outline: none;
    }

    /* Subtle hover state for active line. */
    div :global(.cm-editor:hover .cm-activeLine) {
        background-color: var(--cm-active-line);
    }

    /* Style the search panel to fit. */
    div :global(.cm-panels) {
        border-bottom: 1px solid var(--cm-gutter-border);
    }
</style>
