import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target. Configure a webhook in Sanity to POST here on publish
 * with the shared `SANITY_REVALIDATE_SECRET`. The document `_type` matches the
 * cache tags used by the loaders, so publishing invalidates exactly the right
 * data. Projects additionally bust their per-slug tag.
 */
type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Missing _type in payload", { status: 400 });
    }

    revalidateTag(body._type);
    if (body._type === "project" && body.slug?.current) {
      revalidateTag(`project:${body.slug.current}`);
    }

    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (error) {
    console.error("[revalidate] webhook failed:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
