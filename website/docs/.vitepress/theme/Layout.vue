<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useRoute, useRouter } from "vitepress";
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";

const route = useRoute();
const router = useRouter();

function currentPath() {
  return route.path || "/";
}

function toEnglishPath(path: string) {
  if (path === "/en" || path.startsWith("/en/")) return path;
  if (path === "/") return "/en/";
  return `/en${path.startsWith("/") ? path : `/${path}`}`;
}

function toChinesePath(path: string) {
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) {
    const rest = path.slice("/en".length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return path;
}

function isLanguageMenuAnchor(anchor: HTMLAnchorElement) {
  return Boolean(
    anchor.closest(
      ".VPNavBarTranslations, .VPFlyoutTranslations, .VPNavBarTranslationsPopper, .translations",
    ),
  );
}

function resolveTarget(anchor: HTMLAnchorElement) {
  const rawHref = anchor.getAttribute("href") || "";
  const href = rawHref.replace(/\/+$/, "") || "/";
  const label = (anchor.textContent || "").trim();
  const path = currentPath();
  const onEnglish = path === "/en" || path.startsWith("/en/");

  if (label === "English" || href === "/en") {
    return toEnglishPath(path);
  }
  if (label.includes("简体") || label.includes("中文") || href === "/") {
    return onEnglish ? toChinesePath(path) : path;
  }
  return null;
}

function isPlaygroundHref(href: string) {
  return href === "/playground" || href.startsWith("/playground/") || href.includes("/playground/");
}

function patchPlaygroundLinks() {
  document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    if (!isPlaygroundHref(href)) return;
    if (anchor.getAttribute("target") !== "_blank") {
      anchor.setAttribute("target", "_blank");
    }
    const rel = anchor.getAttribute("rel") || "";
    if (!rel.includes("noopener")) {
      anchor.setAttribute("rel", rel ? `${rel} noopener noreferrer`.trim() : "noopener noreferrer");
    }
  });
}

function onClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest("a");
  if (!(anchor instanceof HTMLAnchorElement)) return;

  const href = anchor.getAttribute("href") || "";
  if (isPlaygroundHref(href)) {
    if (anchor.getAttribute("target") !== "_blank") {
      anchor.setAttribute("target", "_blank");
    }
    if (!(anchor.getAttribute("rel") || "").includes("noopener")) {
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  }

  if (!isLanguageMenuAnchor(anchor)) return;

  const nextPath = resolveTarget(anchor);
  if (nextPath == null) return;

  // Stay on the current page when the locale root would otherwise be used.
  if (nextPath !== currentPath()) {
    event.preventDefault();
    event.stopPropagation();
    router.go(nextPath);
    return;
  }
  if ((anchor.getAttribute("href") || "/") !== nextPath) {
    event.preventDefault();
    event.stopPropagation();
  }
}

onMounted(() => {
  document.addEventListener("click", onClick, true);
  patchPlaygroundLinks();
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    patchPlaygroundLinks();
  },
);

onBeforeUnmount(() => {
  document.removeEventListener("click", onClick, true);
});
</script>

<template>
  <DefaultTheme.Layout />
</template>
