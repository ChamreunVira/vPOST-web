/**
 * Component-owned style recipes for the original management screens.
 *
 * These intentionally use Tailwind utilities rather than selectors in
 * globals.css. Keeping the recipes here makes the page markup self-contained
 * while retaining responsive, hover, focus, and descendant styles.
 */
export const legacy = {
  actionButton:
    "inline-grid place-items-center border-0 bg-transparent p-1.5 text-[#8993a2] transition-colors hover:rounded-[3px] hover:bg-[#f2f1ff] hover:text-[#07885f]",
  button:
    "inline-flex h-9 items-center justify-center gap-2 rounded-[4px] border border-transparent px-3.5 text-[13px] font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#54b996] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  buttonDanger: "border-[#f4d8d9] bg-[#fff4f4] text-[#c3414b] hover:bg-[#fff0f0]",
  buttonGhost: "bg-transparent text-[#596477] hover:border-[#c4c9d4] hover:bg-[#fafbfc]",
  buttonPrimary: "bg-[#07885f] text-white hover:bg-[#056447]",
  buttonSecondary: "border-[#e1e6ed] bg-white text-[#465265] hover:border-[#c4c9d4] hover:bg-[#fafbfc]",
  chartBar:
    "relative min-h-3 max-w-[33px] flex-1 rounded-t-[3px] bg-[#72c6a7] odd:bg-[#d5eee5] last:bg-[#07885f]",
  chartBars: "absolute inset-[16px_0_30px_25px] flex items-end gap-[14px]",
  chartGrid: "absolute inset-x-0 top-[14px] bottom-[34px] flex flex-col justify-between [&>span]:w-full [&>span]:border-t [&>span]:border-dashed [&>span]:border-[#edf0f4]",
  chartLabels: "absolute bottom-0 left-[25px] right-0 flex justify-between text-[11px] text-[#a0a7b1]",
  chartWrap: "relative h-[252px] px-[5px] pb-5 pt-3",
  dashboardGrid: "grid gap-[18px] lg:grid-cols-[minmax(0,1.5fr)_minmax(310px,0.9fr)] max-[1100px]:grid-cols-1",
  dataTable:
    "w-full min-w-[760px] border-collapse [&_th]:border-b [&_th]:border-[#e1e6ed] [&_th]:bg-[#fcfcfd] [&_th]:px-4 [&_th]:py-[13px] [&_th]:text-left [&_th]:text-[11px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.05em] [&_th]:text-[#8f98a7] [&_th]:whitespace-nowrap [&_td]:border-b [&_td]:border-[#eef0f3] [&_td]:px-4 [&_td]:py-[14px] [&_td]:text-[14px] [&_td]:text-[#536074] [&_td]:whitespace-nowrap [&_tbody_tr:hover]:bg-[#fcfcff] [&_tbody_tr:last-child_td]:border-b-0 [&_td_strong]:font-semibold [&_td_strong]:text-[#29364a] [&_td_small]:mt-[3px] [&_td_small]:block [&_td_small]:text-[12px] [&_td_small]:text-[#9aa2ad]",
  detailCard: "p-5 [&_h2]:mb-[17px] [&_h2]:mt-0 [&_h2]:text-[14px]",
  detailInfo:
    "grid gap-x-[30px] gap-y-[18px] sm:grid-cols-2 [&_span]:mb-1 [&_span]:block [&_span]:text-[12px] [&_span]:text-[#929baa] [&_strong]:text-[14px] [&_strong]:text-[#344055]",
  detailLayout: "grid gap-[18px] lg:grid-cols-[minmax(0,1.45fr)_minmax(270px,0.7fr)] max-[760px]:grid-cols-1",
  emptyIcon: "mb-3 grid h-11 w-11 place-items-center rounded-full bg-[#e7f7f0] text-[#07885f]",
  emptyState:
    "flex flex-col items-center px-[18px] py-[50px] text-center text-[#7c8696] [&_strong]:text-[15px] [&_strong]:text-[#303c50] [&_p]:my-[6px] [&_p]:max-w-[300px] [&_p]:text-[13px] [&_p]:leading-[1.65]",
  formActions: "flex justify-end gap-2 pt-1.5",
  formCard: "mb-[14px] rounded-[5px] border border-[#e1e6ed] bg-white",
  formField:
    "flex flex-col gap-1.5 [&_label]:text-[12px] [&_label]:font-semibold [&_label]:text-[#606c7d] [&_input]:h-[38px] [&_input]:rounded-[4px] [&_input]:border [&_input]:border-[#e1e6ed] [&_input]:bg-white [&_input]:px-[11px] [&_input]:text-[14px] [&_input]:text-[#324055] [&_input]:outline-none [&_input:focus]:border-[#9995e8] [&_select]:h-[38px] [&_select]:rounded-[4px] [&_select]:border [&_select]:border-[#e1e6ed] [&_select]:bg-white [&_select]:px-[11px] [&_select]:text-[14px] [&_select]:text-[#324055] [&_select]:outline-none [&_select:focus]:border-[#9995e8] [&_textarea]:min-h-20 [&_textarea]:resize-y [&_textarea]:rounded-[4px] [&_textarea]:border [&_textarea]:border-[#e1e6ed] [&_textarea]:bg-white [&_textarea]:p-[9px_11px] [&_textarea]:text-[14px] [&_textarea]:text-[#324055] [&_textarea]:outline-none [&_textarea:focus]:border-[#9995e8] [&_small]:text-[12px] [&_small]:text-[#c3414b]",
  formGrid: "grid gap-4 sm:grid-cols-2 max-[760px]:grid-cols-1",
  formLayout: "max-w-[940px]",
  formSection:
    "border-b border-[#edf0f4] p-5 last:border-b-0 [&>h2]:mb-1 [&>h2]:mt-0 [&>h2]:text-[15px] [&>p]:mb-[18px] [&>p]:mt-0 [&>p]:text-[13px] [&>p]:text-[#929ba8]",
  inlineInput: "h-8 w-[78px] rounded-[3px] border border-[#e1e6ed] px-2 text-[13px]",
  loginCard: "w-full max-w-[390px] rounded-[6px] bg-white p-[33px]",
  loginCopy: "my-[9px] mb-[25px] text-[15px] leading-[1.6] text-[#7b8696]",
  loginDemo: "mt-5 block text-center text-[13px] text-[#057450] no-underline hover:underline",
  loginForm: "grid gap-4 [&_.button]:mt-[5px] [&_.button]:h-[42px] [&_.button]:w-full",
  loginPage: "grid min-h-screen place-items-center bg-[#081b3f] p-5",
  miniTable:
    "w-full border-collapse [&_th]:pb-[11px] [&_th]:text-left [&_th]:text-[11px] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.04em] [&_th]:text-[#98a0ae] [&_td]:border-t [&_td]:border-[#f0f2f5] [&_td]:py-[11px] [&_td]:text-[13px] [&_td]:text-[#4c586b] [&_td_strong]:font-semibold [&_td_strong]:text-[#29354b]",
  pageHeaderAction: "flex gap-2",
  panel: "overflow-hidden rounded-[5px] border border-[#e1e6ed] bg-white",
  panelBody: "p-[18px_19px] max-[760px]:p-[14px]",
  panelHeader:
    "flex min-h-[61px] items-center justify-between gap-2.5 border-b border-[#edf0f4] p-[16px_19px] max-[760px]:p-[14px] [&_h2]:m-0 [&_h2]:text-[15px] [&_h2]:text-[#222e43] [&_p]:mt-1 [&_p]:text-[13px] [&_p]:text-[#929aa7]",
  periodTabs: "flex gap-[3px] [&_button]:rounded-[3px] [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-2 [&_button]:py-[5px] [&_button]:text-[12px] [&_button]:text-[#8993a3]",
  productCell: "flex items-center gap-2.5 [&_img]:h-[31px] [&_img]:w-[31px] [&_img]:rounded-[4px] [&_img]:object-cover",
  productGrid: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3",
  productThumb: "h-[34px] w-[34px] rounded-[4px] bg-[#eff1f4] object-cover",
  rank: "w-[14px] text-[12px] text-[#afb6c0]",
  reportCards: "mb-[18px] grid gap-[13px] sm:grid-cols-3 max-[760px]:grid-cols-1",
  reportKpi:
    "rounded-[5px] border border-[#e1e6ed] bg-white p-4 [&>span]:text-[12px] [&>span]:text-[#8791a0] [&>strong]:mt-2.5 [&>strong]:block [&>strong]:text-[22px] [&>small]:mt-1.5 [&>small]:block [&>small]:text-[12px] [&>small]:text-[#19875a]",
  reportTabs: "mb-[19px] flex gap-[22px] border-b border-[#e1e6ed] [&_button]:relative [&_button]:border-0 [&_button]:bg-transparent [&_button]:pb-[11px] [&_button]:text-[13px] [&_button]:text-[#8892a1]",
  roleBadge: "rounded-[3px] bg-[#e1f3ec] px-2 py-1 text-[12px] font-semibold text-[#057450]",
  saveMessage: "mt-3 text-[12px] text-[#19875a]",
  searchInput: "flex h-9 items-center gap-[7px] min-w-[220px] rounded-[4px] border border-[#e1e6ed] bg-white px-2.5 text-[#98a1af] max-[760px]:min-w-0",
  selectControl: "relative flex h-9 items-center rounded-[4px] border border-[#e1e6ed] bg-white text-[#586476]",
  settingsLayout: "grid items-start gap-[18px] lg:grid-cols-[190px_minmax(0,720px)] max-[760px]:grid-cols-1",
  settingsNav: "p-2 [&_button]:block [&_button]:w-full [&_button]:rounded-[3px] [&_button]:border-0 [&_button]:bg-transparent [&_button]:p-[11px_12px] [&_button]:text-left [&_button]:text-[13px] [&_button]:text-[#7c8696] [&_button.active]:bg-[#e7f7f0] [&_button.active]:font-semibold [&_button.active]:text-[#057450]",
  statCard: "rounded-[5px] border border-[#e1e6ed] bg-white p-[18px_19px]",
  statGrid: "mb-[19px] grid grid-cols-2 gap-[13px] lg:grid-cols-4 max-[760px]:gap-[9px]",
  summaryBlock: "ml-auto mt-[19px] max-w-[260px]",
  summaryRow: "mb-2.5 flex justify-between text-[13px] text-[#7f8998] [&_strong]:text-[#293549]",
  summaryTotal: "mt-3 border-t border-dashed border-[#dfe3e8] pt-[15px] text-[14px] text-[#3d4758] [&_strong]:text-[21px] [&_strong]:text-[#232e43]",
  tableWrap: "overflow-x-auto border border-[#e1e6ed] border-t-0 bg-white",
  textLink: "flex items-center gap-[3px] text-[13px] text-[#057450] no-underline hover:underline",
  timeline: "ml-[5px] mt-2 border-l border-[#e0e4eb] pl-[18px]",
  timelineItem: "relative pb-[18px] pl-0 [&_strong]:block [&_strong]:text-[13px] [&_small]:mt-1 [&_small]:block [&_small]:text-[12px] [&_small]:text-[#969fab]",
  toolbar: "flex items-center justify-between gap-3 rounded-t-[5px] border border-[#e1e6ed] bg-white p-[11px_13px] max-[760px]:flex-col max-[760px]:items-stretch",
  toolbarLeft: "flex flex-wrap items-center gap-2 max-[760px]:w-full",
  topProduct: "flex items-center gap-2.5 border-b border-[#f0f2f5] py-[11px] last:border-0 [&>span:nth-child(3)]:flex-1 [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-semibold [&_strong]:text-[#29354b] [&_small]:text-[12px] [&_small]:text-[#9ba3ad] [&>b]:text-[13px] [&>b]:font-semibold [&>b]:text-[#4a5567]",
};

export type LegacyStyleName = keyof typeof legacy;
