<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class CorbadoAPI
{
    protected $httpClient;
    protected $backend_url = 'https://backendapi.corbado.io';

    /**
     * Create a new CorbadoAPI instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->httpClient = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->withBasicAuth(config('corbado.project_id'), config('corbado.secret'));
    }

    /**
     * Retrieve client information from the request.
     *
     * @param  Request  $request
     * @return array
     */
    public function retrieveClientInfo(Request $request): array
    {
       return [
        'remoteAddress' => $request->ip(),
        'userAgent' => $request->header('User-Agent'),
       ];
    }

    /**
     * Generate a unique request ID.
     *
     * @return string
     */
    public function generateRequestId():string
    {
        return 'req-'.Str::ulid();
    }

    /**
     * Get an association token for the specified login identifier type.
     *
     * @param  Request  $request
     * @param  string  $loginIdentifierType
     * @return array
     */
    public function getAssociationToken(Request $request, string $loginIdentifierType): array
    {
        $response = $this->httpClient->post($this->backend_url . '/v1/associationTokens', [
            'loginIdentifier' => $request->user()->email,
            'loginIdentifierType' => $loginIdentifierType,
            'requestID' => $this->generateRequestId(),
            'clientInfo' => $this->retrieveClientInfo($request),
        ]);

        return $response->json();
    }

}
